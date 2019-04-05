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
            menuItemList.forEach(item =>
                completeMenuItemList.push({
                    name: item.name,
                    itemID: item.itemID,
                    meal: item.meal,
                    location: locations[location]
                })
            );
    }
    // unset location and/or meal for duplicate items
    completeMenuItemList = completeMenuItemList
        // set the first occurence of a duplicated item to have undefined location
        .map((entry, index, self) => {
            let otherIndex = self.findIndex(
                otherEntry =>
                    otherEntry.name === entry.name &&
                    otherEntry.itemID === entry.itemID &&
                    otherEntry.meal === entry.meal &&
                    otherEntry.location != entry.location
            );
            return otherIndex == -1 ? entry : { ...entry, location: undefined };
        })
        // remove all later duplicated items
        .filter(
            (entry, index, self) =>
                index ===
                self.findIndex(
                    otherEntry =>
                        otherEntry.name === entry.name &&
                        otherEntry.itemID === entry.itemID &&
                        otherEntry.meal === entry.meal
                )
        )
        // set the first occurence of a duplicated item to have undefined meal
        .map((entry, index, self) => {
            let otherIndex = self.findIndex(
                otherEntry =>
                    otherEntry.name === entry.name &&
                    otherEntry.itemID === entry.itemID &&
                    otherEntry.meal != entry.meal &&
                    otherEntry.location === entry.location
            );
            return otherIndex == -1 ? entry : { ...entry, meal: undefined };
        })
        // remove all later duplicated items
        .filter(
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
