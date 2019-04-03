import getMenuItemList from "./getMenuItemList";
import mealNames from "../../config/mealNames";
import monthName from "../../config/monthName";

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
export default function processMenu(data, query) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error("Empty object returned from YaleDining API");
    }
    // get date for menus -- relies on the fact that server is on EST/EDT
    const date = new Date();
    const today =
        monthName[date.getMonth()] +
        ", " +
        date.getDate() +
        " " +
        date.getFullYear() +
        " 00:00:00";
    const tomorrow =
        monthName[date.getMonth()] +
        ", " +
        (date.getDate() + 1) +
        " " +
        date.getFullYear() +
        " 00:00:00";
    // meal query -- return a list of MenuItem objects
    if ("meal" in query) {
        if (query.meal == "all") {
            var completeMenuItemList = [];
            for (let mealName in mealNames) {
                const filteredData = data.DATA.filter(
                    entry =>
                        entry[data.COLUMNS.indexOf("MEALNAME")] == mealName &&
                        entry[data.COLUMNS.indexOf("MENUDATE")] == today
                );
                const menuItemList = getMenuItemList(
                    data.COLUMNS,
                    filteredData
                );
                menuItemList &&
                    menuItemList.forEach(item =>
                        completeMenuItemList.push(item)
                    );
            }
            return completeMenuItemList;
        } else {
            const filteredData = data.DATA.filter(
                entry =>
                    mealNames[entry[data.COLUMNS.indexOf("MEALNAME")]] ==
                        query.meal &&
                    entry[data.COLUMNS.indexOf("MENUDATE")] == today
            );
            const menuItemList = getMenuItemList(data.COLUMNS, filteredData);
            if (menuItemList == undefined) {
                throw new Error("Invalid menu request");
            } else {
                return menuItemList;
            }
        }
    }
    // location query -- return a list of Menus objects
    else {
        var menus = {};
        menus["location"] = data.DATA[0][data.COLUMNS.indexOf("LOCATION")];
        menus["today"] = {};
        menus["tomorrow"] = {};
        for (let mealName in mealNames) {
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
                    entry =>
                        entry[data.COLUMNS.indexOf("MENUDATE")] === tomorrow
                )
            );
        }
        return [menus];
    }
}
