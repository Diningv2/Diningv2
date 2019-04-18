import axios from "axios";

import parseMenuItemData from "./parseMenuItemData";

import queryBuilder from "../../util/queryBuilder";
import * as constants from "../../config/constants";

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
    if (!menuitemid) {
        throw new Error(constants.E_BAD_MENU_ITEM_REQ);
    }
    const nutritionEndpoint =
        constants.NUTRITION_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: menuitemid });
    const filterEndpoint =
        constants.FILTERS_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: menuitemid });
    const ingredientsEndpoint =
        constants.INGREDIENTS_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: menuitemid });
    try {
        const nutritionResponse = await axios.get(nutritionEndpoint);
        const filterResponse = await axios.get(filterEndpoint);
        const ingredientsResponse = await axios.get(ingredientsEndpoint);
        const menu = parseMenuItemData(
            nutritionResponse.data,
            filterResponse.data,
            ingredientsResponse.data
        );
        return menu;
    } catch (e) {
        throw new Error(constants.E_NO_API_RES);
    }
}
