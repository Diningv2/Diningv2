import firestore from "../../config/firebase/firebaseConfig";
import getOneLocation from "./getOneLocation";

import locations from "../../config/locations";
import * as constants from "../../config/constants";

/**
 *
 * Processes the locations in the query, calling the getOneLocation 
 * for a single call, or for multiple calls (in a loop).
 *
 * @param {Object} data [the data from yale api axios response]
 * @param {Object} query [the query passed in by user of our api]
 *
 * Returns the location object with the location information for 
 * one or all locations based on the query
 * 
 */

export default async function processLocations(data, query) {
    // throw on bad response from Yale Dining
    if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
        throw new Error(constants.E_NO_API_RES);
    }

    // Get firebase doc, checking for errors
    let hoursDoc = undefined;
    try {
        hoursDoc = await firestore.doc("locations/hours").get();
    } catch (e) {
        throw new Error(constants.E_DB_READ);
    }

    // Process based on single location, or multi locations in query
    if ("location" in query) {
        return await getOneLocation(data, query, hoursDoc);
    } else {
        var allLocations = {};
        const maxErrors = Object.keys(locations).length;
        var nErrors = 0;
        for (let location in locations) {
            try {
                query["location"] = location;
                allLocations[locations[location]] = await getOneLocation(
                    data,
                    query, 
                    hoursDoc
                );
            } catch (e) {
                nErrors++;
                const message = e.message;
                const readableLocation = locations[location];
                console.error(
                    `${message}: ${readableLocation} (total: ${nErrors})`
                );
                if (nErrors >= maxErrors) {
                    throw new Error(constants.E_NO_API_RES);
                }
            }
        }
        return allLocations;
    }
}
