import axios from "axios";

import mealNames from "../../config/mealNames";
import queryBuilder from "../../util/queryBuilder";
import dateBuilder from "../../util/dateBuilder";
import { MENUS_URI, E_NO_API_RES, YD_VERSION } from "../../config/constants";

export default async function getHours(location, offset) {
    console.log("ENTERED GET_HOURS");
    const endpoint = MENUS_URI + queryBuilder({ version: YD_VERSION, location });
    const response = await axios.get(endpoint);
    const data = response.data;
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error(E_NO_API_RES);
    }
    const date = dateBuilder(offset);
    const dateFilteredData = data.DATA.filter(
        entry => entry[data.COLUMNS.indexOf("MENUDATE")] === date
    );
    var locationHours = {};
    for (let mealName in mealNames) {
        const mealFilteredData = dateFilteredData.filter(
            entry => entry[data.COLUMNS.indexOf("MEALNAME")] === mealName
        );
        locationHours[mealNames[mealName]] = mealFilteredData.length
            ? {
                // all items have the same opening/closing time
                openingTime:
                    mealFilteredData[0][data.COLUMNS.indexOf("MEALOPENS")],
                closingTime:
                    mealFilteredData[0][data.COLUMNS.indexOf("MEALCLOSES")],
                transferTime: undefined
                // TODO: Hardcode in transfer times in ../../config/DiningHallHours
                // diningHallHours[locations[location]][mealNames[mealName]].transferTime
            }
            : undefined;
    }
    return locationHours;
}
