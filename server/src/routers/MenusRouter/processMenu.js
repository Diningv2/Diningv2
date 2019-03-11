import getMenuItemList from './getMenuItemList';
import mealNames from '../../config/mealNames';
import monthName from '../../config/monthName';

/* 
*   processMenu(data, query)
*
*   Summary:
*       Transforms the data returned by the Yale Dining API for a single location into a list of either Menus objects or MenuItem objects
*
*   Parameters:
*       data - the object returned by the Yale Dining API for a specific location
*       query - the query object parsed from the request
*
*   Return Value:
*       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
*
*   Throws:
*       when the data.DATA entry is null, empty, or contains only an empty list
*/
export default function processMenu(data, query) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error('Empty object returned from YaleDining API');
    }
    // get date for menus -- relies on the fact that server is on EST/EDT
    const date = new Date();
    const today = monthName[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear() + ' 00:00:00';
    // meal query -- return a list of MenuItem objects
    if ('meal' in query) {
        const filteredData = data.DATA.filter(entry => (mealNames[entry[data.COLUMNS.indexOf('MEALNAME')]] == query.meal) && (entry[data.COLUMNS.indexOf('MENUDATE')] == today));
        return getMenuItemList(data.COLUMNS, filteredData);
    }
    // location query -- return a list of Menus objects
    else {
        var menus = {};
        // all locations are the same for each call
        menus['location'] = data.DATA[0][data.COLUMNS.indexOf('LOCATION')];
        for (var mealName in mealNames) {
            const filteredData = data.DATA.filter(entry => (entry[data.COLUMNS.indexOf('MEALNAME')] === mealName) && (entry[data.COLUMNS.indexOf('MENUDATE')] === today));
            menus[mealNames[mealName]] = getMenuItemList(data.COLUMNS, filteredData);
        }
        return [ menus ];
    }
}