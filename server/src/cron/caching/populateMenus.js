import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

import getOneMenu from "./getOneMenu";

import locations from "../../config/locations";
import { E_DB_WRITE } from "../../config/constants";

export default async function populateMenus() {
    const menus = await Object.keys(locations).map(
        async location => await getOneMenu(location)
    );
    await menus.forEach(async menu => {
        try {
            await firestore.doc("menus/today").update({
                [menu.location]: firebase.firestore.FieldValue.arrayUnion(
                    menu.today
                )
            });
            await firestore.doc("menus/tomorrow").update({
                [menu.location]: firebase.firestore.FieldValue.arrayUnion(
                    menu.tomorrow
                )
            });
        } catch (e) {
            console.error(E_DB_WRITE + e);
        }
    });
}
