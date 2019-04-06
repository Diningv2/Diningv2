import axios from "axios";

import processLocations from "./processLocations";
import queryBuilder from "../../util/queryBuilder";
import { LOCATIONS_URI } from "../../config/constants";

export default async function getLocations(query) {
    const response = await axios.get(LOCATIONS_URI + queryBuilder({ version: 3}));
    const locations = await processLocations(response.data, query);
    return locations;
}
