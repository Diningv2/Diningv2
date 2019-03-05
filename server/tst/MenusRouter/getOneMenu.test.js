import axios from 'axios';

import getOneMenu from '../../src/routers/MenusRouter/getOneMenu';
import processMenu from '../../src/routers/MenusRouter/processMenu';
import * as responses from '../config/responses';

jest.mock('axios');
jest.mock('../../src/routers/MenusRouter/processMenu');

test('getOneMenu() -- normal function', async () => {
    axios.get.mockResolvedValue({ 'data': responses.singleMenu });
    processMenu.mockImplementationOnce(() => responses.fullMenuExpectedResponse);
    await expect(getOneMenu({ 'location': 5 })).resolves.toEqual(responses.fullMenuExpectedResponse);
    expect(processMenu).toHaveBeenCalledWith(responses.singleMenu, { 'location': 5 });
});

test('getOneMenu() -- bad response from axios', async () => {
    axios.get.mockResolvedValue(undefined);
    await expect(getOneMenu({ 'location': 5 })).rejects.toThrow('Empty object returned for: Morse');
});

test('getOneMenu() -- exception caught from axios', async () => {
    axios.get.mockImplementation(() => Promise.reject());
    await expect(getOneMenu({ 'location': 5 })).rejects.toThrow('Empty object returned for: Morse');
});

test('getOneMenu() -- exception caught from processMenu()', async () => {
    axios.get.mockResolvedValue({ 'data': undefined });
    processMenu.mockImplementationOnce(() => { throw new Error('Empty object returned from YaleDining API') });
    await expect(getOneMenu({ 'location': 5 })).rejects.toThrow('Empty object returned for: Morse');
});