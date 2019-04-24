import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

import { E_BAD_FAVE_POST_REQ, E_DB_WRITE } from "../../config/constants";

export default async function removeFavorite(token, menuItemID) {
    if (!token || !menuItemID) {
        throw new Error(E_BAD_FAVE_POST_REQ);
    }
    try {
        await firestore.doc("favorites/menuItems").update({
            [menuItemID]: firebase.firestore.FieldValue.arrayRemove(token)
        });
        await firestore.doc("favorites/users").update({
            [token]: firebase.firestore.FieldValue.arrayRemove(`${menuItemID}`)
        });
    } catch (e) {
        throw new Error(`${E_DB_WRITE}: ${e}`);
    }
}
