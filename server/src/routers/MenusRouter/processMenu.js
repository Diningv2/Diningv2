import getMenuItemList from "./getMenuItemList";

import mealNames from "../../config/mealNames";
import dateBuilder from "../../util/dateBuilder";
import { E_NO_API_RES, E_BAD_MENU_REQ } from "../../config/constants";

/*
 *   processMenu(data, query)
 *
 *   Summary:
 *       Transforms the data returned by the Yale Dining API for a single location into a list of either Menus objects or MenuItem objects
 *
 *   Parameters:
 *       data - the object returned by the Yale Dining API for a specific location
 *       query - the query object parsed from the request
 *
 *   Return Value:
 *       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
 *
 *   Throws:
 *       when the data.DATA entry is null, empty, or contains only an empty list
 *       when the no items are returned from getMenuItemList
 */
export default function processMenu(data) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error(E_NO_API_RES);
    }
    const today = dateBuilder(0);
    const tomorrow = dateBuilder(1);
    var menus = {};
    menus["location"] = data.DATA[0][data.COLUMNS.indexOf("LOCATION")];
    menus["today"] = {};
    menus["tomorrow"] = {};
    Object.keys(mealNames).forEach(mealName => {
        const filteredData = data.DATA.filter(
            entry => entry[data.COLUMNS.indexOf("MEALNAME")] === mealName
        );
        menus["today"][mealNames[mealName]] = getMenuItemList(
            data.COLUMNS,
            filteredData.filter(
                entry => entry[data.COLUMNS.indexOf("MENUDATE")] === today
            )
        );
        menus["tomorrow"][mealNames[mealName]] = getMenuItemList(
            data.COLUMNS,
            filteredData.filter(
                entry => entry[data.COLUMNS.indexOf("MENUDATE")] === tomorrow
            )
        );
    });
    return menus;
}
