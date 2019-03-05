import getAllMenus from '../../src/routers/MenusRouter/getAllMenus';
import getOneMenu from '../../src/routers/MenusRouter/getOneMenu';
import * as responses from '../config/responses';
import locations from '../../src/config/locations'

jest.mock('../../src/routers/MenusRouter/getOneMenu');

beforeEach(() => console.warn = jest.fn());
afterEach(() => console.warn.mockClear());

test('getAllMenus() -- normal function with meal query', async () => {
    getOneMenu.mockImplementation((query) => {
        switch (query.location) {
            case '3': return responses.hopperDinnerMenu;
            case '4': return responses.davenportDinnerMenu;
            case '5': return responses.morseDinnerMenu;
            default: throw new Error('Empty object returned for: ' + locations[query.location]);
        }
    });
    await expect(getAllMenus({ 'meal': 'dinner' })).resolves.toEqual(responses.multiDinnerMenu);
    expect(console.warn).toHaveBeenCalledTimes(Object.keys(locations).length - 3);
});

test('getAllMenus() -- normal function without meal query', async () => {
    getOneMenu.mockImplementation((query) => {
        switch (query.location) {
            case '3': return responses.hopperMenu;
            case '4': return responses.davenportMenu;
            case '5': return responses.morseMenu;
            default: throw new Error('Empty object returned for: ' + locations[query.location]);
        }
    });
    await expect(getAllMenus({})).resolves.toEqual(responses.multiMenuExpectedResponse);
    expect(console.warn).toHaveBeenCalledTimes(Object.keys(locations).length - 3);
});

test('getAllMenus() -- normal function with meal query with duplicates', async () => {
    getOneMenu.mockImplementation((query) => {
        switch (query.location) {
            case '3': return responses.hopperDinnerMenu;
            case '4': return responses.davenportDinnerMenu;
            case '5': return responses.morseDinnerMenuDuplicate;
            default: throw new Error('Empty object returned for: ' + locations[query.location]);
        }
    });
    await expect(getAllMenus({ 'meal': 'dinner' })).resolves.toEqual(responses.multiDinnerMenu);
    expect(console.warn).toHaveBeenCalledTimes(Object.keys(locations).length - 3);
});

test('getAllMenus() -- bad response from all dinining halls', async () => {
    getOneMenu.mockImplementation(() => { throw new Error('Empty object returned for: ' + locations[query.location]); });
    await expect(getAllMenus({})).rejects.toThrow('Empty object returned for all locations');
    expect(console.warn).toHaveBeenCalledTimes(Object.keys(locations).length);
});
