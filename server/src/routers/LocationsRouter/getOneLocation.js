import getHours from "./getHours";

import locations from "../../config/locations";
import { E_BAD_LOC_REQ } from "../../config/constants";

export default async function getOneLocation(data, query, hoursDoc) {
    const location = data.DATA.filter(
        entry => entry[data.COLUMNS.indexOf("ID_LOCATION")] == query.location
    );
    if (location.length) {
        const entry = location[0];
        let todayHours = undefined;
        let tomorrowHours = undefined;

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
