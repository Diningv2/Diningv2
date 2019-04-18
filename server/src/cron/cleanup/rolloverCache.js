import firestore from "../../config/firebase/firebaseConfig";

import { E_DB_READ, E_DB_NOENT } from "../../config/constants";
import locations from "../../config/locations";

export default async function rolloverCache() {
    let tomorrowDoc = undefined;
    try {
        tomorrowDoc = await firestore.doc("menus/tomorrow").get();
    } catch (e) {
        throw new Error(E_DB_READ + e);
    }
    if (!tomorrowDoc.exists) {
        throw new Error(E_DB_NOENT + "menus/tomorrow");
    }
    try {
        const date = new Date();
        const timestamp = date.toDateString();
        var newTodayDoc = {};
        Object.values(locations).forEach(location => {
            newTodayDoc[location] = {
                menu: tomorrowDoc.data()[location].menu,
                timestamp
            };
        });
        await firestore.doc("menus/today").set(newTodayDoc);
    } catch (e) {
        console.error(e);
    }
}
