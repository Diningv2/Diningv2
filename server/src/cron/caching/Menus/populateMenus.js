import * as firebase from "firebase-admin";
import firestore from "../../../config/firebase/firebaseConfig";

import getOneMenu from "./getOneMenu";

import locations from "../../../config/locations";
import { E_DB_WRITE } from "../../../config/constants";

export default async function populateMenus() {
    const date = new Date();
    const timestamp = date.toDateString();
    console.log("Populating Firestore...");
    for (let location in locations) {
        const menu = await getOneMenu(location);
        try {
            menu &&
                menu.today &&
                (await firestore.doc("menus/today").update({
                    [menu.location]: { menu: menu.today, timestamp }
                }));
            menu &&
                menu.tomorrow &&
                (await firestore.doc("menus/tomorrow").update({
                    [menu.location]: { menu: menu.tomorrow, timestamp }
                }));
        } catch (e) {
            console.error(E_DB_WRITE + e);
        }
    }
    console.log("Finished populating Firestore.");
}
