import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

import { E_BAD_FAVE_POST_REQ, E_DB_WRITE } from "../../config/constants";

export default async function addFavorite(token, menuItemID) {
    if (!token || !menuItemID) {
        throw new Error(E_BAD_FAVE_POST_REQ);
    }
    const expoToken = `ExponentPushToken[${token}]`;
    try {
        await firestore.doc("favorites/menuItems").update({
            [menuItemID]: firebase.firestore.FieldValue.arrayUnion(expoToken)
        });
        await firestore.doc("favorites/users").update({
            [token]: firebase.firestore.FieldValue.arrayUnion(menuItemID)
        });
    } catch (e) {
        throw new Error(E_DB_WRITE + e);
    }
}
