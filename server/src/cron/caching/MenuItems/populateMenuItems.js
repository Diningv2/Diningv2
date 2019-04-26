import firestore from "../../../config/firebase/firebaseConfig";

import getOneMenu from "../Menus/getOneMenu";

import locations from "../../../config/locations";
import { E_DB_WRITE } from "../../../config/constants";

export default async function populateMenuItems() {
    console.log(`Attempting to populate menu items...`);
    var menuItems = [];
    for (let location in locations) {
        const menu = await getOneMenu(location);
        menu &&
            menu.today &&
            Object.keys(menu.today).forEach(meal =>
                menu.today[meal].forEach(
                    menuItem => menuItem.hasInfo && menuItems.push(menuItem)
                )
            );
        menu &&
            menu.tomorrow &&
            Object.keys(menu.tomorrow).forEach(meal =>
                menu.tomorrow[meal].forEach(
                    menuItem => menuItem.hasInfo && menuItems.push(menuItem)
                )
            );
    }
    menuItems = menuItems.filter(
        (item, index, self) =>
            index ===
            self.findIndex(
                otherItem =>
                    otherItem.name === item.name &&
                    otherItem.itemID === item.itemID
            )
    );
    menuItems.forEach(item => delete item.meal);
    for (let item of menuItems) {
        try {
            await firestore
                .doc("menuItems/itemIDs")
                .update({ [item.itemID]: item });
        } catch (e) {
            console.error(`${E_DB_WRITE}: ${e}`);
        }
    }
    console.log(`Successfully populated menu items.`);
}
