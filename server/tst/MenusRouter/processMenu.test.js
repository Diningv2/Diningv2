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

test("processMenu() -- normal function without meal query", () => {
    getMenuItemList
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => responses.hotBreakfastMenu)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => responses.lunchMenu)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => responses.dinnerMenu)
        .mockImplementationOnce((a, b) => undefined);
    expect(processMenu(responses.singleMenu)).toEqual(
        responses.fullMenuExpectedResponse[0]
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
    expect(() => processMenu(responses.emptyMenu)).toThrow(
        "Empty object returned from YaleDining API"
    );
});

test("processMenu() -- undefined response from getMenuItemList() without meal query", () => {
    getMenuItemList
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined)
        .mockImplementationOnce((a, b) => undefined);
    expect(processMenu(responses.singleMenu)).toEqual(
        responses.emptyExpectedResponse[0]
    );
    expect(getMenuItemList).toHaveBeenCalledTimes(10);
});
