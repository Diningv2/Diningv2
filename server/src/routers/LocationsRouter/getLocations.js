import axios from "axios";

import processLocations from "./processLocations";
import queryBuilder from "../../util/queryBuilder";
import { LOCATIONS_URI, YD_VERSION } from "../../config/constants";

/**
 *
 * Processed query, making axios call to yale API
 *
 * @param {JS Object} query [contains the info passed to URI]
 *
 * @return locations result
 * 
 */

export default async function getLocations(query) {
    const response = await axios.get(LOCATIONS_URI + queryBuilder({ version: YD_VERSION }));
    const locations = await processLocations(response.data, query);
    return locations;
}
