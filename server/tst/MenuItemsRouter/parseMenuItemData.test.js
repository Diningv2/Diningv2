import parseMenuItemData from "../../src/routers/MenuItemsRouter/parseMenuItemData";
import parseNutritionInfo from "../../src/routers/MenuItemsRouter/parseNutritionInfo";
import parseIngredients from "../../src/routers/MenuItemsRouter/parseIngredients";
import * as responses from "../config/menuItemResponses";
import { E_NO_API_RES } from "../../src/config/constants";

jest.mock("../../src/routers/MenuItemsRouter/parseNutritionInfo");
jest.mock("../../src/routers/MenuItemsRouter/parseIngredients");

test("parseMenuItemData() -- normal function", () => {
    parseNutritionInfo.mockImplementationOnce(
        () => responses.nutritionWaffleResponse
    );
    parseIngredients.mockImplementationOnce(
        () => responses.ingredientWaffleList
    );
    expect(
        parseMenuItemData(
            responses.axiosNutritionWaffleData,
            responses.axiosFilterWaffleData,
            responses.axiosIngredientWaffleData
        )
    ).toEqual(responses.menuItemDataResponse);
    expect(parseNutritionInfo).toHaveBeenCalledWith(responses.nutritionCols, responses.nutritionWaffle);
    expect(parseIngredients).toHaveBeenCalledWith(responses.ingredientCols, responses.ingredientWaffle);
});

test("parseMenuItemData() -- empty nutrition input", () => {
    expect(
        parseMenuItemData(
            {},
            responses.axiosFilterWaffleData,
            responses.axiosIngredientWaffleData
        )
    ).toEqual(responses.emptyMenuItemDataResponse); 
});

test("parseMenuItemData() -- empty filter input", () => {
    expect(
        parseMenuItemData(
            responses.axiosNutritionWaffleData,
            {},
            responses.axiosIngredientWaffleData
        )
    ).toEqual(responses.emptyMenuItemDataResponse); 
});

test("parseMenuItemData() -- empty ingredient input", () => {
    expect(
        parseMenuItemData(
            responses.axiosNutritionWaffleData,
            responses.axiosFilterWaffleData,
            {}
        )
    ).toEqual(responses.emptyMenuItemDataResponse); 
});
