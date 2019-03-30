import axios from "axios";

import processMenu from "./processMenu";

const MENUS_URI = "http://www.yaledining.org/fasttrack/menus.cfm?version=3";

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
export default async function getOneMenu(query) {
    const endpoint = MENUS_URI + "&location=" + query.location;
    const response = await axios.get(endpoint);
    return processMenu(response.data, query);
}
