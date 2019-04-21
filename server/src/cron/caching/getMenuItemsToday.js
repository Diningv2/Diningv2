import axios from "axios";

import getMenuItemList from "../../routers/MenusRouter/getMenuItemList";

import locations from "../../config/locations";
import queryBuilder from "../../util/queryBuilder";
import dateBuilder from "../../util/dateBuilder";
import { MENUS_URI, YD_VERSION } from "../../config/constants";

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
                var menuItem = completeMenuItemList[itemID];
                if (menuItem){
                    completeMenuItemList[itemID].meal = 
                        (!menuItem.meal[meal]) 
                        ? { ...menuItem.meal, [meal]:true}
                        : menuItem.meal;
                    completeMenuItemList[itemID].location = 
                        (!menuItem.location[locations[location]]) 
                        ? { ...menuItem.location, [locations[location]]:true}
                        : menuItem.location;
                } else {
                    completeMenuItemList[itemID] = {
                        name, 
                        meal: {[meal]:true},
                        location: {[locations[location]]:true}, 
                        timestamp
                    }
                }
            });
    }

    return completeMenuItemList;
}
