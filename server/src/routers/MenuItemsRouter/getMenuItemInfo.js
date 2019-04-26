import firestore from "../../config/firebase/firebaseConfig";

import getMenuIdInfo from "./getMenuIdInfo";
import getCachedMenuItemInfo from "./getCachedMenuItemInfo";

import { E_DB_READ, E_BAD_MENU_ITEM_REQ } from "../../config/constants";

export default async function getMenuItemInfo(query) {
    if (!("menuitemid" in query)) {
        throw new Error(E_BAD_MENU_ITEM_REQ);
    }
    var menuItemsDoc = undefined;
    try {
        menuItemsDoc = await firestore.doc("menuItems/itemIDs").get();
    } catch (e) {
        console.error(`${E_DB_READ}: ${e}`);
    }
    const cachedMenuItem = query.cached
        ? await getCachedMenuItemInfo(query.menuitemid, menuItemsDoc)
        : undefined;
    return cachedMenuItem || (await getMenuIdInfo(query.menuitemid));
}
