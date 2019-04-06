import firestore from "../config/firebase/firebaseConfig";

import { E_DB_READ, E_DB_NOENT, E_NO_API_RES } from "../config/constants";

export default async function getPushTokens(menuItems) {
    let menuItemsDoc = undefined;
    try {
        menuItemsDoc = await firestore.doc("favorites/menuItems").get();
    } catch (e) {
        throw new Error(E_DB_READ + e);
    }
    if (!menuItemsDoc.exists) {
        throw new Error(E_DB_NOENT + "favorites/menuItems");
    } else if (!menuItems) {
        throw new Error(E_NO_API_RES);
    }
    var tokenToMenuItems = {};
    menuItems.forEach(async menuItem => {
        if (menuItemsDoc.data()[menuItem.itemID]) {
            menuItemsDoc.data()[menuItem.itemID].forEach(token => {
                const { name, meal, location } = menuItem;
                const item = { name, meal, location };
                tokenToMenuItems[token]
                    ? tokenToMenuItems[token].push(item)
                    : (tokenToMenuItems[token] = [item]);
            });
        } else {
            await firestore
                .doc("favorites/menuItems")
                .update({ [menuItem.itemID]: [] });
        }
    });
    const notificationObjects = tokenToMenuItems.map((token, index, self) => {
        const itemList = self[token];
        const { name, meal, location } = itemList[0];
        const body =
            `${name} ` +
            (itemList.length > 1
                ? `and ${itemList.length - 1} others are `
                : `is `) +
            ` being served ` +
            (meal && itemList.length == 1 ? `for ${meal} ` : "") +
            (location && itemList.length == 1 ? `at ${location} ` : "") +
            `today!`;
        return {
            to: token,
            sound: "default",
            body: body,
            data: {}
        };
    });
    return notificationObjects;
}
