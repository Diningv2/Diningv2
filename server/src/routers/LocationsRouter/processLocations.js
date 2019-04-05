import locations from "../../config/locations";
import getOneLocation from "./getOneLocation";

export default async function processLocations(data, query) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error("Empty object returned from YaleDining API");
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
                console.error(
                    e.message +
                        " for: " +
                        locations[location] +
                        " (total: " +
                        nErrors +
                        ")"
                );
                if (nErrors >= maxErrors) {
                    throw new Error(
                        "Empty object returned from YaleDining API"
                    );
                }
            }
        }
        return allLocations;
    }
}
