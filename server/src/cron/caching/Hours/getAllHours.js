import axios from "axios";

import getMenuItemList from "../../../routers/MenusRouter/getMenuItemList";

import locations from "../../../config/locations";
import queryBuilder from "../../../util/queryBuilder";
import dateBuilder from "../../../util/dateBuilder";
import mealNames from "../../../config/mealNames";
import { MENUS_URI, YD_VERSION, E_NO_API_RES } from "../../../config/constants";

export default async function getHoursToday() {
    const offsets = [0, 1];
    const today = dateBuilder(0);
    const currentDate = new Date();
    const timestamp = currentDate.toDateString();
    var completeHoursList ={};

    for (let location in locations) {
        const endpoint = MENUS_URI + queryBuilder({ version: YD_VERSION, location });
        const response = await axios.get(endpoint);
        const data = response.data;

        for (let offset of offsets){
            const date = dateBuilder(offset);
            const dateString = (offset == 0) ? "todayHours" : "tomorrowHours";
            const dateFilteredData = data.DATA.filter(
                entry => entry[data.COLUMNS.indexOf("MENUDATE")] === date
            );

            var locationHoursOneDay = {};
            for (let mealName in mealNames) {
                const mealFilteredData = dateFilteredData.filter(
                    entry => entry[data.COLUMNS.indexOf("MEALNAME")] === mealName
                );
                mealFilteredData.length && 
                    (locationHoursOneDay[mealNames[mealName]] = {
                            // all items have the same opening/closing time
                            openingTime:
                                mealFilteredData[0][data.COLUMNS.indexOf("MEALOPENS")],
                            closingTime:
                                mealFilteredData[0][data.COLUMNS.indexOf("MEALCLOSES")],
                            // transferTime: ""
                            // TODO: Hardcode in transfer times in ../../config/DiningHallHours
                            // diningHallHours[locations[location]][mealNames[mealName]].transferTime
                    });
            } 
            if (!completeHoursList[locations[location]])
                completeHoursList[locations[location]] = {};
            completeHoursList[locations[location]][dateString] = locationHoursOneDay;
        }
    }
    return completeHoursList;
}
