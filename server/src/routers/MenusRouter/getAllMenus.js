import getOneMenu from "./getOneMenu";

import locations from "../../config/locations";
import { E_NO_API_RES } from "../../config/constants";

/*
 *   getAllMenus(query)
 *
 *   Summary:
 *       Assemblies queries to the Yale Dining API for all locations and converts the returned data into a list of either Menus objects or MenuItem objects
 *
 *   Parameters:
 *       query - the query object parsed from the request
 *
 *   Return Value:
 *       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
 *
 *   Throws:
 *       when an exception is caught for a critical threshold of requests to getOneMenu()
 */
export default async function getAllMenus(query) {
    var allMenus = [];
    const maxErrors = Object.keys(locations).length;
    var nErrors = 0;
    for (let location in locations) {
        try {
            query.location = location;
            const menus = await getOneMenu(query);
            menus.forEach(menu => allMenus.push(menu));
        } catch (e) {
            nErrors++;
            const message = e.message;
            const readableLocation = locations[location];
            console.error(
                `${message}: ${readableLocation} (total: ${nErrors})`
            );
            if (nErrors >= maxErrors) {
                throw new Error(E_NO_API_RES);
            }
        }
    }
    return "meal" in query
        ? allMenus.filter(
              (entry, index, self) =>
                  index ===
                  self.findIndex(
                      otherEntry =>
                          otherEntry.name === entry.name &&
                          otherEntry.itemID === entry.itemID
                  )
          )
        : allMenus;
}
