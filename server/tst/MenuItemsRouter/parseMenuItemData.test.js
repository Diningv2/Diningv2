import parseMenuItemData from "../../src/routers/MenuItemsRouter/parseMenuItemData";
import parseNutritionInfo from "../../src/routers/MenuItemsRouter/parseNutritionInfo";
import * as responses from "../config/menuItemResponses";
import { E_NO_API_RES } from "../../src/config/constants";

jest.mock("../../src/routers/MenuItemsRouter/parseNutritionInfo");

test("parseMenuItemData() -- normal function", () => {
    parseNutritionInfo.mockImplementationOnce(
        () => responses.nutritionWaffleResponse
    );
    expect(
        parseMenuItemData(
            responses.nutritionWaffleData,
            responses.filterWaffleData,
            responses.ingredientWaffleData
        )
    ).toEqual(responses.menuItemDataResponse);
    expect(parseNutritionInfo).toHaveBeenCalledWith(responses.nutritionWaffle);
});

test("parseMenuItemData() -- empty nutrition input", () => {
    expect(() =>
        parseMenuItemData(
            {},
            responses.filterWaffleData,
            responses.ingredientWaffleData
        )
    ).toThrow(E_NO_API_RES);
});

test("parseMenuItemData() -- empty filter input", () => {
    expect(() =>
        parseMenuItemData(
            responses.nutritionWaffleData,
            {},
            responses.ingredientWaffleData
        )
    ).toThrow(E_NO_API_RES);
});

test("parseMenuItemData() -- empty ingredient input", () => {
    expect(() =>
        parseMenuItemData(
            responses.nutritionWaffleData,
            responses.filterWaffleData,
            {}
        )
    ).toThrow(E_NO_API_RES);
});
