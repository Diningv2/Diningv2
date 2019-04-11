import parseNutritionInfo from "./parseNutritionInfo";
import filters from "../../config/filters.js";
import { E_NO_API_RES } from "../../config/constants";

/**
 * Parses and combines the nutrition (by call to parseNutritionInfo),
 * filter, and ingredient data into a single json menu
 *
 * throws an error if any of the inputs are null or empty
 * or missing DATA field or empty DATA field
 *
 * @param {dict} nutritionData
 * @param {dict} filterData
 * @param {dict} ingredientData
 *
 * return {dict} with menu as a single json object
 *
 */

export default function parseMenuItemData(
    nutritionData,
    filterData,
    ingredientData
) {
    // Error checking for invalid/empty data object
    if (
        !nutritionData ||
        !nutritionData.DATA ||
        !nutritionData.DATA.length ||
        !nutritionData.DATA[0].length
    ) {
        throw new Error(E_NO_API_RES);
    }
    if (
        !filterData ||
        !filterData.DATA ||
        !filterData.DATA.length ||
        !filterData.DATA[0].length
    ) {
        throw new Error(E_NO_API_RES);
    }
    if (
        !ingredientData ||
        !ingredientData.DATA ||
        !ingredientData.DATA.length ||
        !ingredientData.DATA[0].length
    ) {
        throw new Error(E_NO_API_RES);
    }

    // Process ingredient list
    var ingredientList = [];
    for (var ingredient of ingredientData.DATA) {
        // separates out multi-item ingredients
        ingredient[1]
            // remove any non-ingredient strings
            .replace(/(Contains.+$)|(Manufactured.+$)/, "")
            // split along any "and", ",", or "." strings not in parentheses
            .split(/([,\.]|and)(?![^(]*\))/)
            // filter out any "and", ",", or "." strings
            .filter(i => !/(^\s*and\s*$)|(^\s*,\s*$)|(^\s*\.\s*$)/.test(i))
            // remove any "." characters
            .map(i => (i = i.replace(".", "")))
            // trim the results of whitespace
            .map(i => i.trim())
            // push all nonempty strings
            .forEach(i => i.length && ingredientList.push(i));
    }
    // remove duplicate ingredients
    ingredientList = ingredientList.filter(
        (entry, index, self) =>
            index === self.findIndex(otherEntry => otherEntry === entry)
    );

    // Process filters
    var isVegan = false;
    var isVegetarian = false;
    var isGlutenFree = false;
    var filterList = []; // list of applicable filters
    var boolFilters = filterData.DATA[0].slice(2, filters.length + 2);
    filters.map((filter, i) => {
        if (boolFilters[i] == 1) {
            if (filter == "Vegan") isVegan = true;
            else if (filter == "Vegetarian") isVegetarian = true;
            else if (filter == "Gluten Free") isVegetarian = true;
            else filterList.push(filter);
        }
    });

    return {
        name: nutritionData.DATA[0][1],
        nutrition: parseNutritionInfo(nutritionData.DATA[0]),
        ingredients: ingredientList,
        filterProperties: filterList,
        isVegan: isVegan,
        isVegetarian: isVegetarian,
        isGlutenFree: isGlutenFree,
        rating: 5 // TODO : this line is temporarily hard coded
    };
}
