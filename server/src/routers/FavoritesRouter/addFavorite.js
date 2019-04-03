import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

export default async function addFavorite(token, menuItemID) {
    if (!token || !menuItemID) {
        throw new Error("Push token and item ID are required");
    }
    try {
        await firestore.doc("favorites/menuItems").update({
            [menuItemID]: firebase.firestore.FieldValue.arrayUnion(token)
        });
        await firestore.doc("favorites/users").update({
            [token]: firebase.firestore.FieldValue.arrayUnion(menuItemID)
        });
    } catch (e) {
        console.error("Error writing document: ", e);
    }
}
