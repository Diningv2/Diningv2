import firestore from "../../config/firebase/firebaseConfig";

import getOneMenu from "./getOneMenu";
import getCachedMenu from "./getCachedMenu";

import locations from "../../config/locations";
import { E_DB_READ } from "../../config/constants";

export default async function getMenus(query) {
    const queries =
        !query.location || query.location == "all"
            ? Object.keys(locations)
            : [query.location];
    const maxErrors = queries.length;
    var nErrors = 0;
    var menus = [];
    for (let location of queries) {
        var todayDoc = undefined;
        var tomorrowDoc = undefined;
        try {
            todayDoc = await firestore.doc("menus/today").get();
            tomorrowDoc = await firestore.doc("menus/tomorrow").get();
        } catch (e) {
            console.error(`${E_DB_READ}: ${e}`);
        }
        try {
            const cachedMenu = query.cached
                ? await getCachedMenu(location, todayDoc, tomorrowDoc)
                : undefined;
            const menu = cachedMenu || (await getOneMenu(location));
            menus.push(menu);
        } catch (e) {
            nErrors++;
            console.error(
                `${e.message}: ${locations[location]} (total: ${nErrors})`
            );
            if (nErrors >= maxErrors) {
                throw new Error(e.message);
            }
        }
    }
    return menus;
}
