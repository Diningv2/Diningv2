import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

export default async function removeFavorite(token, menuItemID) {
    if (!token || !menuItemID) {
        throw new Error("Push token and item ID are required");
    }
    try {
        await firestore.doc("favorites/menuItems").update({
            [menuItemID]: firebase.firestore.FieldValue.arrayRemove(token)
        });
        await firestore.doc("favorites/users").update({
            [token]: firebase.firestore.FieldValue.arrayRemove(menuItemID)
        });
    } catch (e) {
        throw new Error("Could not write document: " + e);
    }
}
