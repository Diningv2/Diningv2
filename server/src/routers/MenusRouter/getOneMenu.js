import axios from 'axios';

import processMenu from './processMenu'
import locations from '../../config/locations';

const MENUS_URI = 'http://www.yaledining.org/fasttrack/menus.cfm?version=3';

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
*
*   Throws:
*       when an exception is caught from the request to the Yale Dining API or the call to processMenu()
*/
export default async function getOneMenu(query) {
    const endpoint = MENUS_URI + '&location=' + query.location;
    try {
        const response = await axios.get(endpoint);
        const menu = processMenu(response.data, query);
        return menu;
    }
    catch (e) {
        throw new Error('Empty object returned for: ' + locations[query.location]);
    }
}