import getHours from "./getHours";

import locations from "../../config/locations";
import { E_BAD_LOC_REQ } from "../../config/constants";

/**
 *
 * Gets one location's info, using cache for hours when possible
 *
 * @param  data [The data from the axios call to yale api]
 * @param  query [The query with location info]
 * @param  hoursDoc [The firebase doc object for locations/hours]
 *
 * @return {JS Object} [locations api info, such as hours, busyness, ...]
 * 
 */

export default async function getOneLocation(data, query, hoursDoc) {
    // Filter by data location
    const location = data.DATA.filter(
        entry => entry[data.COLUMNS.indexOf("ID_LOCATION")] == query.location
    );
    if (location.length) {
        const entry = location[0];
        let todayHours = undefined;
        let tomorrowHours = undefined;

        // Use cache when possible
        try {
            todayHours= hoursDoc && 
                        hoursDoc.data() && 
                        hoursDoc.data()[locations[query.location]] &&
                        hoursDoc.data()[locations[query.location]]["todayHours"]
                            ? hoursDoc.data()[locations[query.location]]["todayHours"]
                            : await getHours(query.location, 0);
            tomorrowHours= hoursDoc && 
                        hoursDoc.data() && 
                        hoursDoc.data()[locations[query.location]] &&
                        hoursDoc.data()[locations[query.location]]["tomorrowHours"]
                            ? hoursDoc.data()[locations[query.location]]["tomorrowHours"]
                            : await getHours(query.location, 0);

        } catch (e) {
            console.error(e);
        }
        
        // Format output object
        return {
            name: entry[data.COLUMNS.indexOf("DININGLOCATIONNAME")],
            todayHours,
            tomorrowHours,
            isOpen: parseFloat(entry[data.COLUMNS.indexOf("ISCLOSED")])
                ? false
                : true,
            busyness: parseInt(entry[data.COLUMNS.indexOf("CAPACITY")]),
            geolocation: entry[data.COLUMNS.indexOf("GEOLOCATION")]
                .split(",")
                .map(v => parseFloat(v))
        };
    } else {
        throw new Error(E_BAD_LOC_REQ);
    }
}
