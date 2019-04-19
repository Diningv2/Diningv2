import axios from "axios";

import parseMenuItemData from "./parseMenuItemData";

import queryBuilder from "../../util/queryBuilder";
import * as constants from "../../config/constants";

export default async function getMenuIdInfo(itemID) {
    if (!itemID) {
        throw new Error(constants.E_BAD_MENU_ITEM_REQ);
    }
    const nutritionEndpoint =
        constants.NUTRITION_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: itemID });
    const filterEndpoint =
        constants.FILTERS_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: itemID });
    const ingredientsEndpoint =
        constants.INGREDIENTS_URI +
        queryBuilder({ version: constants.YD_VERSION, MENUITEMID: itemID });
    try {
        const nutritionResponse = await axios.get(nutritionEndpoint);
        const filterResponse = await axios.get(filterEndpoint);
        const ingredientsResponse = await axios.get(ingredientsEndpoint);

        const {
            allergens,
            nutrition,
            ingredients,
            isVegan,
            isVegetarian,
            isGlutenFree,
            hasInfo
        } = parseMenuItemData(
            nutritionResponse,
            filterResponse,
            ingredientsResponse
        );

        if (!hasInfo) {
            throw new Error(constants.E_NO_API_RES);
        }

        const name = nutritionResponse.data.DATA[0][
            nutritionResponse.data.COLUMNS.indexOf("RECP_NAME")
        ].replace("`", "'");

        return {
            name,
            itemID,
            allergens,
            ingredients,
            nutrition,
            isVegan,
            isVegetarian,
            isGlutenFree,
            hasInfo
        };
    } catch (e) {
        throw new Error(constants.E_NO_API_RES);
    }
}
