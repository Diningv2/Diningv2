import firestore from "../../../config/firebase/firebaseConfig";

import getOneMenu from "./getOneMenu";
import mergeMenu from "./mergeMenu";

import locations from "../../../config/locations";
import { E_DB_WRITE } from "../../../config/constants";

export default async function populateMenus() {
    const date = new Date();
    const timestamp = date.toDateString();
    for (let location in locations) {
        console.log(`Attempting to populate ${locations[location]}...`);
        const menu = await getOneMenu(location);
        try {
            const mergedMenu =
                menu &&
                menu.today &&
                menu.tomorrow &&
                (await mergeMenu(menu, location));
            mergedMenu &&
                mergedMenu.today &&
                (await firestore.doc("menus/today").update({
                    [mergedMenu.location]: { menu: mergedMenu.today, timestamp }
                }));
            mergedMenu &&
                mergedMenu.tomorrow &&
                (await firestore.doc("menus/tomorrow").update({
                    [mergedMenu.location]: {
                        menu: mergedMenu.tomorrow,
                        timestamp
                    }
                }));
        } catch (e) {
            console.error(`${E_DB_WRITE}: ${e}`);
            console.log(`Failed to populate ${locations[location]}.`);
        }
        console.log(`Successfully populated ${locations[location]}.`);
    }
}
