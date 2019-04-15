import parseNutritionInfo from "./parseNutritionInfo";
import parseIngredients from "./parseIngredients";

import filters from "../../config/filters.js";
import { E_NO_API_RES } from "../../config/constants";

export default function parseMenuItemData(
    nutritionData,
    filterData,
    ingredientData
) {
    if (
        !nutritionData ||
        !nutritionData.DATA ||
        !nutritionData.DATA.length ||
        !nutritionData.DATA[0].length ||
        !filterData ||
        !filterData.DATA ||
        !filterData.DATA.length ||
        !filterData.DATA[0].length ||
        !ingredientData ||
        !ingredientData.DATA ||
        !ingredientData.DATA.length ||
        !ingredientData.DATA[0].length
    ) {
        console.error(E_NO_API_RES);
        return {
            allergens: [],
            nutrition: {},
            ingredients: [],
            isVegan: false,
            isVegetarian: false,
            isGlutenFree: false
        }
    }

    // get nutrition info
    const nutrition = parseNutritionInfo(
        nutritionData.COLUMNS,
        nutritionData.DATA[0]
    );

    // get ingredient list
    const ingredients = parseIngredients(
        ingredientData.COLUMNS,
        ingredientData.DATA
    );

    // get allergens
    var isVegan = false;
    var isVegetarian = false;
    var isGlutenFree = false;
    var allergens = [];
    var boolFilters = filterData.DATA[0].slice(2, filters.length + 2);
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
        isGlutenFree
    };
}
