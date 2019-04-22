import axios from "axios";

import getMenuItemList from "../../../routers/MenusRouter/getMenuItemList";

import locations from "../../../config/locations";
import queryBuilder from "../../../util/queryBuilder";
import dateBuilder from "../../../util/dateBuilder";
import mealStrings from "../../../config/mealStrings";
import { MENUS_URI, YD_VERSION } from "../../../config/constants";

export default async function getMenuItemsToday() {
    const today = dateBuilder(0);
    const date = new Date();
    const timestamp = date.toDateString();
    var completeMenuItemList ={};
    for (let location in locations) {
        const endpoint = MENUS_URI + queryBuilder({ version: YD_VERSION, location });
        const response = await axios.get(endpoint);
        const filteredData = response.data.DATA.filter(
            entry => entry[response.data.COLUMNS.indexOf("MENUDATE")] == today
        );
        const menuItemList = getMenuItemList(
            response.data.COLUMNS,
            filteredData
        );

        menuItemList &&
            menuItemList.forEach(item => {
                const { name, itemID, meal } = item;
                const mealName = mealStrings[meal];
                var menuItem = completeMenuItemList[itemID];
                menuItem && 
                    (menuItem.meal.indexOf(mealName) < 0) &&
                        (completeMenuItemList[itemID].meal.push(mealName));
                menuItem && 
                    (menuItem.location.indexOf(locations[location]) < 0) &&
                        (completeMenuItemList[itemID].location.push(locations[location]));
                !menuItem && 
                    (completeMenuItemList[itemID] = {
                        name, 
                        meal:[mealName],
                        location: [locations[location]], 
                        timestamp
                    });
            });
    }

    return completeMenuItemList;
}
