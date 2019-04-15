import * as firebase from "firebase-admin";
import firestore from "../../config/firebase/firebaseConfig";

import getOneMenu from "./getOneMenu";

import locations from "../../config/locations";
import { E_DB_WRITE } from "../../config/constants";

export default async function populateMenus() {
    for (let location in locations) {
        const menu = await getOneMenu(location);
        try {
            menu &&
                menu.today &&
                (await firestore.doc("menus/today").update({
                    [menu.location]: menu.today
                }));
            menu &&
                menu.tomorrow &&
                (await firestore.doc("menus/tomorrow").update({
                    [menu.location]: menu.tomorrow
                }));
        } catch (e) {
            console.error(E_DB_WRITE + e);
        }
    }
}
