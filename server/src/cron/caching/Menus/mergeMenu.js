import firestore from "../../../config/firebase/firebaseConfig";

import { E_NO_API_RES, E_DB_READ, E_DB_NOENT } from "../../../config/constants";

export default async function mergeMenu(menu, location) {
    if (!menu.today || !menu.tomorrow) {
        throw new Error(E_NO_API_RES);
    }
    var todayDoc = undefined;
    var tomorrowDoc = undefined;
    try {
        todayDoc = await firestore.doc("menus/today").get();
        tomorrowDoc = await firestore.doc("menus/tomorrow").get();
    } catch (e) {
        throw new Error(`${E_DB_READ}: ${e}`);
    }
    if (!todayDoc.exists) {
        throw new Error(`${E_DB_NOENT}: menus/today`);
    } else if (!tomorrowDoc.exists) {
        throw new Error(`${E_DB_NOENT}: menus/tomorrow`);
    }

    const firestoreToday = todayDoc.data()[location].menu;
    const firestoreTomorrow = tomorrowDoc.data()[location].menu;
    const { today, tomorrow } = menu;

    menu.today = updateMenu(today, firestoreToday);
    menu.tomorrow = updateMenu(tomorrow, firestoreTomorrow);

    return menu;
}

function updateMenu(menu, firestoreMenu) {
    for (let meal of Object.keys(menu)) {
        for (let item of menu[meal]) {
            const index = menu[meal].indexOf(item);
            const firestoreIndex =
                meal in firestoreMenu &&
                firestoreMenu[meal].findIndex(
                    firestoreItem =>
                        item.name == firestoreItem.name &&
                        item.itemID == firestoreItem.itemID &&
                        item.meal == firestoreItem.meal
                );
            menu[meal][index] =
                firestoreIndex &&
                firestoreIndex != -1 &&
                firestoreMenu[firestoreIndex].hasInfo
                    ? firestoreMenu[meal][firestoreIndex]
                    : menu[meal][index];
        }
    }
    return menu;
}
