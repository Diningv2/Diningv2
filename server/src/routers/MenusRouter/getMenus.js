import getOneMenu from "./getOneMenu";
import getCachedMenu from "./getCachedMenu";

import locations from "../../config/locations";

export default async function getMenus(query) {
    const queries =
        !query.location || query.location == "all"
            ? Object.keys(locations)
            : [query.location];
    const maxErrors = queries.length;
    var nErrors = 0;
    var menus = [];
    for (let location of queries) {
        try {
            const cachedMenu = query.cached
                ? await getCachedMenu(location)
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
