import getMenuItemList from "../../src/routers/MenusRouter/getMenuItemList";
import * as responses from "../config/responses";

test("getMenuItemList() -- normal function", () => {
    expect(
        getMenuItemList(responses.columns, responses.singleMenuData)
    ).toEqual(responses.singleMenuDataExpectedResponse);
});

test("getMenuItemList() -- empty data array", () => {
    expect(getMenuItemList(responses.columns, [])).toBeUndefined();
});

test("getMenuItemList() -- some empty entries", () => {
    expect(
        getMenuItemList(responses.columns, responses.singleMenuDataWithEmpty)
    ).toEqual(responses.singleMenuDataWithEmptyExpectedResponse);
});

test("getMenuItemList() -- some duplicate entries", () => {
    expect(
        getMenuItemList(
            responses.columns,
            responses.singleMenuDataWithDuplicates
        )
    ).toEqual(responses.singleMenuDataExpectedResponse);
});
