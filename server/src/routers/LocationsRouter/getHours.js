import axios from "axios";

import mealNames from "../../config/mealNames";
import queryBuilder from "../../util/queryBuilder";
import dateBuilder from "../../util/dateBuilder";
import { MENUS_URI, E_NO_API_RES, YD_VERSION } from "../../config/constants";

/**
 *
 * This route calls the yale dining api directly to get hours 
 * used cache fails for some reason
 *
 * @param {int} location [location id that we are calling]
 * @param {int} offset [0 or 1 for today and tomorrow]
 *
 * @return {JS Object} [contains the location hours (open/close times)]
 * 
 */

export default async function getHours(location, offset) {
    
    // Make API call to MENUS uri
    const endpoint = MENUS_URI + queryBuilder({ version: YD_VERSION, location });
    const response = await axios.get(endpoint);
    const data = response.data;
    
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error(E_NO_API_RES);
    }

    // build date based on today/tomorrow offset and filter by date
    const date = dateBuilder(offset);
    const dateFilteredData = data.DATA.filter(
        entry => entry[data.COLUMNS.indexOf("MENUDATE")] === date
    );

    // Loop mealnames based to add open/close times for each meal 
    // (for given location and date)
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
