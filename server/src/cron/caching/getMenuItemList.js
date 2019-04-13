import axios from "axios";

import parseMenuItemData from "./parseMenuItemData";

import * as constants from "../../config/constants";
import queryBuilder from "../../util/queryBuilder";

export default async function getMenuItemList(columns, data) {
    const menu = await data.map(async entry => {
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
        try {
            const nutritionResponse = await axios.get(nutritionEndpoint);
            const filterResponse = await axios.get(filterEndpoint);
            const ingredientsResponse = await axios.get(ingredientsEndpoint);
            console.log(nutritionResponse);
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
            return {
                name: entry[columns.indexOf("MENUITEM")].replace("`", "'"),
                itemID: entry[columns.indexOf("MENUITEMID")],
                meal: entry[columns.indexOf("MEALNAME")],
                allergens,
                ingredients,
                nutrition,
                isVegan,
                isVegetarian,
                isGlutenFree
            };
        } catch (e) {
            // console.error(e);
            return undefined;
        }
    });
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
    return filteredMenu.length ? filteredMenu : undefined;
}
