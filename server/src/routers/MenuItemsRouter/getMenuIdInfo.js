import axios from 'axios';

import parseMenuItemData from './parseMenuItemData';

const NUTRITION_URI = 'http://www.yaledining.org/fasttrack/menuitem-nutrition.cfm?version=3';
const FILTERS_URI = 'http://www.yaledining.org/fasttrack/menuitem-codes.cfm?version=3';
const INGREDIENTS_URI = 'http://www.yaledining.org/fasttrack/menuitem-ingredients.cfm?version=3';

/**
 * Gets nutrition, filters (allergans, etc), and ingredients data from dining api
 * 
 * thorws if an error caught by one of the dining api calls or by the call to parseMenus
 *
 * @param int menuitemid
 * 
 * returns a menu (json format, as specified in spec)
 */

export default async function getMenuIdInfo(menuitemid) {
    const nutritionEndpoint = NUTRITION_URI + '&MENUITEMID=' + menuitemid;
    const filterEndpoint = FILTERS_URI + '&MENUITEMID=' + menuitemid;
    const ingredientsEndpoint = INGREDIENTS_URI + '&MENUITEMID=' + menuitemid;
    try {
        const nutritionResponse = await axios.get(nutritionEndpoint);
        const filterResponse = await axios.get(filterEndpoint);
        const ingredientsResponse = await axios.get(ingredientsEndpoint);
        const menu = parseMenuItemData(nutritionResponse.data, filterResponse.data, ingredientsResponse.data);
        return menu;
    }
    catch (e) {
        throw new Error('Error caught (getMenuIdInfo): ' + menuitemid);
    }
}