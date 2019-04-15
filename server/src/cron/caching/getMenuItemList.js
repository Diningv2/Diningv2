import axios from "axios";

import parseMenuItemData from "./parseMenuItemData";

import * as constants from "../../config/constants";
import queryBuilder from "../../util/queryBuilder";

export default async function getMenuItemList(columns, data) {
    var menu = [];
    for (let entry of data) {
        const menuItemID = entry[columns.indexOf("MENUITEMID")];
        const nutritionEndpoint =
            constants.NUTRITION_URI +
            queryBuilder({
                version: constants.YD_VERSION,
                MENUITEMID: menuItemID
            });
        const filterEndpoint =
            constants.FILTERS_URI +
            queryBuilder({
                version: constants.YD_VERSION,
                MENUITEMID: menuItemID
            });
        const ingredientsEndpoint =
            constants.INGREDIENTS_URI +
            queryBuilder({
                version: constants.YD_VERSION,
                MENUITEMID: menuItemID
            });
        var nutritionResponse = undefined;
        var filterResponse = undefined;
        var ingredientsResponse = undefined;
        try {
            nutritionResponse = await axios.get(nutritionEndpoint, {
                timeout: 10000
            });
            filterResponse = await axios.get(filterEndpoint, {
                timeout: 10000
            });
            ingredientsResponse = await axios.get(ingredientsEndpoint, {
                timeout: 10000
            });
        } catch (e) {
            console.error(e);
        }
        const {
            allergens,
            nutrition,
            ingredients,
            isVegan,
            isVegetarian,
            isGlutenFree
        } = parseMenuItemData(
            nutritionResponse.data,
            filterResponse.data,
            ingredientsResponse.data
        );
        menu.push({
            name: entry[columns.indexOf("MENUITEM")].replace("`", "'"),
            itemID: entry[columns.indexOf("MENUITEMID")],
            meal: entry[columns.indexOf("MEALNAME")],
            allergens,
            ingredients,
            nutrition,
            isVegan,
            isVegetarian,
            isGlutenFree
        });
    }
    // filter out undefined and duplicate entries
    const filteredMenu = menu
        .filter(entry => entry != undefined)
        .filter(
            (entry, index, self) =>
                index ===
                self.findIndex(
                    otherEntry =>
                        otherEntry.name === entry.name &&
                        otherEntry.itemID === entry.itemID &&
                        otherEntry.meal === entry.meal
                )
        );
    return filteredMenu.length ? filteredMenu : [];
}
