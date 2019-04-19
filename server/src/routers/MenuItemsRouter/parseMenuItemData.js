import parseNutritionInfo from "./parseNutritionInfo";
import parseIngredients from "./parseIngredients";

import filters from "../../config/filters.js";
import { E_NO_API_RES } from "../../config/constants";

export default function parseMenuItemData(
    nutritionResponse,
    filterResponse,
    ingredientResponse
) {
    if (
        !nutritionResponse.data ||
        !nutritionResponse.data.DATA ||
        !nutritionResponse.data.DATA.length ||
        !nutritionResponse.data.DATA[0].length ||
        !filterResponse.data ||
        !filterResponse.data.DATA ||
        !filterResponse.data.DATA.length ||
        !filterResponse.data.DATA[0].length ||
        !ingredientResponse.data ||
        !ingredientResponse.data.DATA ||
        !ingredientResponse.data.DATA.length ||
        !ingredientResponse.data.DATA[0].length
    ) {
        console.error(E_NO_API_RES);
        return {
            allergens: [],
            nutrition: {},
            ingredients: [],
            isVegan: false,
            isVegetarian: false,
            isGlutenFree: false,
            hasInfo: false
        };
    }

    // get nutrition info
    const nutrition = parseNutritionInfo(
        nutritionResponse.data.COLUMNS,
        nutritionResponse.data.DATA[0]
    );

    // get ingredient list
    const ingredients = parseIngredients(
        ingredientResponse.data.COLUMNS,
        ingredientResponse.data.DATA
    );

    // get allergens
    var isVegan = false;
    var isVegetarian = false;
    var isGlutenFree = false;
    var allergens = [];
    var boolFilters = filterResponse.data.DATA[0].slice(2, filters.length + 2);
    filters.map((filter, i) => {
        if (boolFilters[i]) {
            switch (filter) {
                case "Vegan":
                    isVegan = true;
                    break;
                case "Vegetarian":
                    isVegetarian = true;
                    break;
                case "Gluten Free":
                    isGlutenFree = true;
                    break;
                default:
                    allergens.push(filter);
            }
        }
    });

    return {
        allergens,
        nutrition,
        ingredients,
        isVegan,
        isVegetarian,
        isGlutenFree,
        hasInfo: true
    };
}
