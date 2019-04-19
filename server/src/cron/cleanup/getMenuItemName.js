import axios from "axios";

import queryBuilder from "../../util/queryBuilder";
import * as constants from "../../config/constants";

/**
 * Gets menu item's correct name from Yale Dining nutrition api
 *
 * thorws if an error caught
 *
 * @param int menuitemid
 *
 * @return (no return value)
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
            throw new Error(constants.E_NO_API_RES);
        }
        return nutritionResponse.data.DATA[0][1];
    } catch (e) {
        throw new Error(constants.E_NO_API_RES);
    }
}
