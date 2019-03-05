import getMenuItemList from '../../src/routers/MenusRouter/getMenuItemList';
import processMenu from '../../src/routers/MenusRouter/processMenu';
import * as responses from '../config/responses';

jest.mock('../../src/routers/MenusRouter/getMenuItemList');

beforeAll(() => {
    const mockedDate = new Date(2019, 2, 1);
    global.Date = jest.fn(() => mockedDate);
});

test('processMenu() -- normal function with meal query', () => {
    getMenuItemList.mockImplementationOnce(() => responses.hotBreakfastMenu);
    expect(processMenu(responses.singleMenu, { 'meal': 'hotBreakfast' })).toEqual(responses.hotBreakfastMenu);
    expect(getMenuItemList).toHaveBeenCalledWith(responses.columns, [responses.hotBreakfastData]);
});

test('processMenu() -- normal function without meal query', () => {
    getMenuItemList.mockImplementationOnce(() => null)
        .mockImplementationOnce(() => responses.hotBreakfastMenu)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => responses.lunchMenu)
        .mockImplementationOnce(() => responses.dinnerMenu);
    expect(processMenu(responses.singleMenu, {})).toEqual(responses.fullMenuExpectedResponse);
    expect(getMenuItemList).toHaveBeenNthCalledWith(2, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(3, responses.columns, [responses.hotBreakfastData]);
    expect(getMenuItemList).toHaveBeenNthCalledWith(4, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(5, responses.columns, [responses.lunchData]);
    expect(getMenuItemList).toHaveBeenNthCalledWith(6, responses.columns, [responses.dinnerData]);
});

test('processMenu() -- null data', () => {
    expect(() => processMenu(responses.emptyMenu, {})).toThrow('Empty object returned from YaleDining API');
});

test('processMenu() -- null response from getMenuItemList() with meal query', () => {
    getMenuItemList.mockImplementationOnce(() => null);
    expect(processMenu(responses.singleMenu, { 'meal': 'brunch' })).toBeNull();
    expect(getMenuItemList).toHaveBeenCalled();
});

test('processMenu() -- null response from getMenuItemList() without meal query', () => {
    getMenuItemList.mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => null);
    expect(processMenu(responses.singleMenu, {})).toEqual(responses.emptyExpectedResponse);
    expect(getMenuItemList).toHaveBeenCalled();
});