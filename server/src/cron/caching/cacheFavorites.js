import firestore from "../../config/firebase/firebaseConfig";

import getMenuItemsToday from "./getMenuItemsToday";
import { E_DB_WRITE, E_NO_API_RES } from "../../config/constants";

export default async function cacheFavorites() {
	var menuItems = undefined;
    try {
        menuItems = await getMenuItemsToday();
    } catch (e) {
        throw new Error(E_NO_API_RES);
    }

    try {
        menuItems &&
            (await firestore
                .doc("favorites/today")
                .set(menuItems));
    } catch (e) {
        console.error(E_DB_WRITE + e);
    }
}