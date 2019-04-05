import axios from "axios";

import getMenuItemList from "../routers/MenusRouter/getMenuItemList";

import locations from "../config/locations";
import monthName from "../config/monthName";

const MENUS_URI = "http://www.yaledining.org/fasttrack/menus.cfm?version=3";

export default async function getMenuItemsToday() {
    // get date for menus -- relies on the fact that server is on EST/EDT
    const date = new Date();
    const today =
        monthName[date.getMonth()] +
        ", " +
        date.getDate() +
        " " +
        date.getFullYear() +
        " 00:00:00";
    var completeMenuItemList = [];
    for (let location in locations) {
        const endpoint = MENUS_URI + "&location=" + location;
        const response = await axios.get(endpoint);
        const filteredData = response.data.DATA.filter(
            entry => entry[response.data.COLUMNS.indexOf("MENUDATE")] == today
        );
        const menuItemList = getMenuItemList(
            response.data.COLUMNS,
            filteredData
        );
        menuItemList &&
            menuItemList.forEach(item => completeMenuItemList.push(item));
    }
    completeMenuItemList = completeMenuItemList.filter(
        (entry, index, self) =>
            index ===
            self.findIndex(
                otherEntry =>
                    otherEntry.name === entry.name &&
                    otherEntry.itemID === entry.itemID
            )
    );
    return completeMenuItemList.length ? completeMenuItemList : undefined;
}
