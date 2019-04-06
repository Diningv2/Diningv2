import axios from "axios";

import parseMenuItemData from "./parseMenuItemData";

import queryBuilder from "../../util/queryBuilder";
import {
    NUTRITION_URI,
    FILTERS_URI,
    INGREDIENTS_URI,
    E_NO_API_RES
} from "../../config/constants";

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
    const nutritionEndpoint =
        NUTRITION_URI + queryBuilder({ version: 3, MENUITEMID: menuitemid });
    const filterEndpoint =
        FILTERS_URI + queryBuilder({ version: 3, MENUITEMID: menuitemid });
    const ingredientsEndpoint =
        INGREDIENTS_URI + queryBuilder({ version: 3, MENUITEMID: menuitemid });
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
        throw new Error(E_NO_API_RES);
    }
}
