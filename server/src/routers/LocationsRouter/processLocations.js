import getOneLocation from "./getOneLocation";

import locations from "../../config/locations";
import { E_NO_API_RES } from "../../config/constants";

export default async function processLocations(data, query) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error(E_NO_API_RES);
    }

    if ("location" in query) {
        return await getOneLocation(data, query);
    } else {
        var allLocations = {};
        const maxErrors = Object.keys(locations).length;
        var nErrors = 0;
        for (let location in locations) {
            try {
                query["location"] = location;
                allLocations[locations[location]] = await getOneLocation(
                    data,
                    query
                );
            } catch (e) {
                nErrors++;
                const message = e.message;
                const readableLocation = locations[location];
                console.error(
                    `${message}: ${readableLocation} (total: ${nErrors})`
                );
                if (nErrors >= maxErrors) {
                    throw new Error(E_NO_API_RES);
                }
            }
        }
        return allLocations;
    }
}
