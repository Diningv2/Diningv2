import getOneMenu from './getOneMenu';
import locations from '../../config/locations';

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
    var maxErrors = Object.keys(locations).length;
    var nErrors = 0;
    for (var location in locations) {
        try {
            query.location = location;
            const menus = await getOneMenu(query);
            menus.forEach((menu) => allMenus.push(menu));
        }
        catch (e) {
            nErrors++;
            console.warn(e.message + ' (total: ' + nErrors + ')');
            if (nErrors >= maxErrors) {
                throw new Error('Empty object returned for all locations');
            }
        }
    }
    if ('meal' in query)
        return allMenus.filter((entry, index, self) => self.findIndex(otherEntry => otherEntry.name === entry.name && otherEntry.itemID === entry.itemID) === index);
    else
        return allMenus;
}