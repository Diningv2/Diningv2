import axios from "axios";

import getMenuItemList from "../routers/MenusRouter/getMenuItemList";

import locations from "../config/locations";
import queryBuilder from "../util/queryBuilder";
import dateBuilder from "../util/dateBuilder";
import { MENUS_URI, YD_VERSION } from "../config/constants";

export default async function getMenuItemsToday() {
    const today = dateBuilder(0);
    var completeMenuItemList = [];
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
                completeMenuItemList.push({
                    name,
                    itemID,
                    meal,
                    location: locations[location]
                });
            });
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
