import axios from "axios";

import mealNames from "../../config/mealNames";
import monthName from "../../config/monthName";
import locations from "../../config/locations";
import diningHallHours from "../../config/diningHallHours";

const MENUS_URI = "http://www.yaledining.org/fasttrack/menus.cfm?version=3";

export default async function getHours(location, offset) {
    const endpoint = MENUS_URI + "&location=" + location;
    const response = await axios.get(endpoint);
    const data = response.data;
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error("Empty object returned from YaleDining API");
    }
    // get date for menus -- relies on the fact that server is on EST/EDT
    const currentDate = new Date();
    const date =
        monthName[currentDate.getMonth()] +
        ", " +
        (currentDate.getDate() + offset) +
        " " +
        currentDate.getFullYear() +
        " 00:00:00";
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
