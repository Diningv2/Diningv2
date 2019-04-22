import axios from "axios";

import getMenuItemList from "./getMenuItemList";

import mealNames from "../../../config/mealNames";
import locations from "../../../config/locations";
import dateBuilder from "../../../util/dateBuilder";
import queryBuilder from "../../../util/queryBuilder";
import { MENUS_URI, YD_VERSION, E_NO_API_RES } from "../../../config/constants";

export default async function getOneMenu(location) {
    const endpoint =
        MENUS_URI + queryBuilder({ version: YD_VERSION, location });
    const response = await axios.get(endpoint);
    const data = response.data;
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        console.error(`${E_NO_API_RES}: ${locations[location]}`);
        return undefined;
    }
    console.log(`Populating ${locations[location]}...`);
    const today = dateBuilder(0);
    const tomorrow = dateBuilder(1);
    var menus = {};
    menus["location"] = locations[location];
    menus["today"] = {};
    menus["tomorrow"] = {};
    for (let mealName in mealNames) {
        const filteredData = data.DATA.filter(
            entry => entry[data.COLUMNS.indexOf("MEALNAME")] === mealName
        );
        menus["today"][mealNames[mealName]] = await getMenuItemList(
            data.COLUMNS,
            filteredData.filter(
                entry => entry[data.COLUMNS.indexOf("MENUDATE")] === today
            )
        );
        menus["tomorrow"][mealNames[mealName]] = await getMenuItemList(
            data.COLUMNS,
            filteredData.filter(
                entry => entry[data.COLUMNS.indexOf("MENUDATE")] === tomorrow
            )
        );
    }
    console.log(`Populated ${locations[location]}.`);
    return menus;
}
