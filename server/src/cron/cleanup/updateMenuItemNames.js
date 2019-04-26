import firestore from "../../config/firebase/firebaseConfig";

import getMenuItemName from "./getMenuItemName";
import * as constants from "../../config/constants";

export default async function updateMenuItemNames() {
    let menusDoc = undefined;
    try {
        menusDoc = await firestore.doc("menus/menuItems").get();
    } catch (e) {
        throw new Error(`${constants.E_DB_READ}: ${e}`);
    }

    if (!menusDoc.exists) {
        throw new Error(`${constants.E_DB_NOENT}: menus/menuItems`);
    }

    Object.keys(menusDoc.data()).map(async menuItemId => {
        var apiName = undefined;
        try {
            apiName = await getMenuItemName(menuItemId);
            if (apiName && menusDoc.data()[menuItemId] != apiName) {
                console.log(
                    `Cleaned Up: ${menusDoc.data()[menuItemId]} to ${apiName}`
                );
                firestore
                    .doc("menus/menuItems")
                    .update({ [menuItemId]: apiName });
            }
        } catch (e) {
            console.log(e);
        }
    });
}
