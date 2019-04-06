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
    var expoTokens = [];
    menuItems.forEach(async menuItem => {
        if (menuItemsDoc.data()[menuItem.itemID]) {
            menuItemsDoc.data()[menuItem.itemID].forEach(token => {
                const { name, meal, location } = menuItem;
                expoTokens.push({ name, meal, location, token });
            });
        } else {
            await firestore
                .doc("favorites/menuItems")
                .update({ [menuItem.itemID]: [] });
        }
    });
    const tokens = expoTokens.map(tokenObject => {
        const { name, meal, location, token } = tokenObject;
        const body =
            `${name} is being served ` +
            (meal ? `for ${meal} ` : "") +
            (location ? `at ${location} ` : "") +
            `today!`;
        return {
            to: token.token,
            sound: "default",
            body: body,
            data: {}
        };
    });
    return tokens;
}
