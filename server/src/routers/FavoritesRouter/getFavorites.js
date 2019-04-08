import firestore from "../../config/firebase/firebaseConfig";

import {
    E_DB_READ,
    E_DB_NOENT,
    E_BAD_FAVE_GET_REQ
} from "../../config/constants";

export default async function getFavorites(token) {
    let usersDoc = undefined;
    try {
        usersDoc = await firestore.doc("favorites/users").get();
    } catch (e) {
        throw new Error(E_DB_READ + e);
    }
    if (!usersDoc.exists) {
        throw new Error(E_DB_NOENT + "favorites/users");
    } else if (!token) {
        throw new Error(E_BAD_FAVE_GET_REQ);
    }
    const expoToken = `ExponentPushToken[${token}]`;
    var menuItems = {};
    usersDoc.data()[expoToken]
        ? usersDoc
              .data()
              [expoToken].forEach(menuItem => (menuItems[menuItem] = true))
        : await firestore.doc("favorites/users").update({ [expoToken]: [] });
    return menuItems;
}
