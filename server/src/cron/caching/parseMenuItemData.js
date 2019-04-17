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
        !nutritionData.data ||
        !nutritionData.data.DATA ||
        !nutritionData.data.DATA.length ||
        !nutritionData.data.DATA[0].length ||
        !filterData.data ||
        !filterData.data.DATA ||
        !filterData.data.DATA.length ||
        !filterData.data.DATA[0].length ||
        !ingredientData.data ||
        !ingredientData.data.DATA ||
        !ingredientData.data.DATA.length ||
        !ingredientData.data.DATA[0].length
    ) {
        console.error(E_NO_API_RES);
        return {
            allergens: [],
            nutrition: {},
            ingredients: [],
            isVegan: false,
            isVegetarian: false,
            isGlutenFree: false
        };
    }

    // get nutrition info
    const nutrition = parseNutritionInfo(
        nutritionData.data.COLUMNS,
        nutritionData.data.DATA[0]
    );

    // get ingredient list
    const ingredients = parseIngredients(
        ingredientData.data.COLUMNS,
        ingredientData.data.DATA
    );

    // get allergens
    var isVegan = false;
    var isVegetarian = false;
    var isGlutenFree = false;
    var allergens = [];
    var boolFilters = filterData.data.DATA[0].slice(2, filters.length + 2);
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
