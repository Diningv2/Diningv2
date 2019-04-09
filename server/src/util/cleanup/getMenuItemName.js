import axios from "axios";

import queryBuilder from "../queryBuilder";
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
    const nutritionEndpoint =
        constants.NUTRITION_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: menuitemid });
    try {
        const nutritionResponse = await axios.get(nutritionEndpoint);
        if (
            !nutritionResponse.data ||
            !nutritionResponse.data.DATA ||
            !nutritionResponse.data.DATA.length ||
            !nutritionResponse.data.DATA[0].length
        ) {
            throw new Error(E_NO_API_RES);
        }
        return nutritionResponse.data.DATA[0][1];
    } catch (e) {
        throw new Error(constants.E_NO_API_RES);
    }
}
