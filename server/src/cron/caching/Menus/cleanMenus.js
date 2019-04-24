import firestore from "../../../config/firebase/firebaseConfig";

import { E_DB_WRITE } from "../../../config/constants";

export default async function cleanMenus() {
    try {
        await firestore.doc("menus/today").set({});
        await firestore.doc("menus/tomorrow").set({});
    } catch (e) {
        console.error(`${E_DB_WRITE}: ${e}`);
    }
}
