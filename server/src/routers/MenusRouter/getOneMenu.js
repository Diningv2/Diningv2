import axios from "axios";

import processMenu from "./processMenu";
import queryBuilder from "../../util/queryBuilder";
import { MENUS_URI, YD_VERSION, E_BAD_MENU_REQ } from "../../config/constants";
import locations from "../../config/locations";

/*
 *   getOneMenu(query)
 *
 *   Summary:
 *       Queries the Yale Dining API for a single location and converts the returned data into a list of either Menus objects or MenuItem objects
 *
 *   Parameters:
 *       query - the query object parsed from the request
 *
 *   Return Value:
 *       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
 */
export default async function getOneMenu(location) {
    if (!(location in locations)) {
        throw new Error(E_BAD_MENU_REQ);
    }
    const endpoint =
        MENUS_URI + queryBuilder({ version: YD_VERSION, location });
    const response = await axios.get(endpoint);
    return processMenu(response);
}
