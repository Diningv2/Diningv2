import getMenuItemList from "../../src/routers/MenusRouter/getMenuItemList";
import processMenu from "../../src/routers/MenusRouter/processMenu";
import * as responses from "./responses";

jest.mock("../../src/routers/MenusRouter/getMenuItemList");

beforeAll(() => {
    const mockedDate = new Date(2019, 2, 1);
    global.Date = jest.fn(() => mockedDate);
});

beforeEach(() => {
    getMenuItemList.mockClear();
});

test("processMenu() -- normal function with meal query", () => {
    getMenuItemList.mockImplementationOnce(() => responses.hotBreakfastMenu);
    expect(processMenu(responses.singleMenu, { meal: "hotBreakfast" })).toEqual(
        responses.hotBreakfastMenu
    );
    expect(getMenuItemList).toHaveBeenCalledWith(responses.columns, [
        responses.hotBreakfastData
    ]);
});

test("processMenu() -- normal function with all meals query", () => {
    getMenuItemList
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => responses.hotBreakfastMenu)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => responses.lunchMenu)
        .mockImplementationOnce(() => responses.dinnerMenu);
    expect(processMenu(responses.singleMenu, { meal: "all" })).toEqual(
        responses.allMealsMenu
    );
    expect(getMenuItemList).toHaveBeenCalledWith(responses.columns, [
        responses.hotBreakfastData
    ]);
    expect(getMenuItemList).toHaveBeenCalledWith(responses.columns, [
        responses.lunchData
    ]);
    expect(getMenuItemList).toHaveBeenCalledWith(responses.columns, [
        responses.dinnerData
    ]);
});

test("processMenu() -- normal function without meal query", () => {
    getMenuItemList
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => responses.hotBreakfastMenu)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => responses.lunchMenu)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => responses.dinnerMenu)
        .mockImplementationOnce(() => undefined);
    expect(processMenu(responses.singleMenu, {})).toEqual(
        responses.fullMenuExpectedResponse
    );
    expect(getMenuItemList).toHaveBeenNthCalledWith(1, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(2, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(3, responses.columns, [
        responses.hotBreakfastData
    ]);
    expect(getMenuItemList).toHaveBeenNthCalledWith(4, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(5, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(6, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(7, responses.columns, [
        responses.lunchData
    ]);
    expect(getMenuItemList).toHaveBeenNthCalledWith(8, responses.columns, []);
    expect(getMenuItemList).toHaveBeenNthCalledWith(9, responses.columns, [
        responses.dinnerData
    ]);
    expect(getMenuItemList).toHaveBeenNthCalledWith(10, responses.columns, []);
});

test("processMenu() -- undefined data", () => {
    expect(() => processMenu(responses.emptyMenu, {})).toThrow(
        "Empty object returned from YaleDining API"
    );
});

test("processMenu() -- undefined response from getMenuItemList() with meal query", () => {
    getMenuItemList.mockImplementationOnce(() => undefined);
    expect(() => processMenu(responses.singleMenu, { meal: "brunch" })).toThrow(
        "Invalid menu request"
    );
    expect(getMenuItemList).toHaveBeenCalled();
});

test("processMenu() -- undefined response from getMenuItemList() without meal query", () => {
    getMenuItemList
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined)
        .mockImplementationOnce(() => undefined);
    expect(processMenu(responses.singleMenu, {})).toEqual(
        responses.emptyExpectedResponse
    );
    expect(getMenuItemList).toHaveBeenCalledTimes(10);
});
