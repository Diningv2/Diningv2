import firestore from "../../config/firebase/firebaseConfig";

import * as constants from "../../config/constants";

export default async function rolloverCache() {
    let tomorrowDoc = undefined;
    try {
        tomorrowDoc = await firestore.doc("menus/tomorrow").get();
    } catch (e) {
        throw new Error(constants.E_DB_READ + e);
    }
    if (!tomorrowDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "menus/tomorrow");
    }
    try {
        await firestore.doc("menus/today").set(tomorrowDoc.data());
        await firestore.doc("menus/tomorrow").set(constants.emptyDoc);
    } catch (e) {
        console.error(e);
    }
}
