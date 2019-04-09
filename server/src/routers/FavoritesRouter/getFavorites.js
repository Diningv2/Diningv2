import firestore from "../../config/firebase/firebaseConfig";

import * as constants from "../../config/constants";

export default async function getFavorites(token) {
    let usersDoc = undefined;
    let menusDoc = undefined;
    try {
        usersDoc = await firestore.doc("favorites/users").get();
        menusDoc = await firestore.doc("menus/menuItems").get();
    } catch (e) {
        throw new Error(constants.E_DB_READ + e);
    }
    if (!usersDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "favorites/users");
    } else if (!menusDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "menus/menuItems");
    } else if (!token) {
        throw new Error(constants.E_BAD_FAVE_GET_REQ);
    }
    const expoToken = `ExponentPushToken[${token}]`;
    var menuItems = {};
    usersDoc.data()[expoToken]
        ? usersDoc.data()[expoToken].forEach(item => (menuItems[item] = menusDoc.data()[item]))
        : await firestore.doc("favorites/users").update({ [expoToken]: [] });
    return menuItems;
}
