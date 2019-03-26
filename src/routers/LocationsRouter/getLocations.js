import axios from "axios";

import processLocations from "./processLocations";

const LOCATIONS_URI =
    "http://www.yaledining.org/fasttrack/locations.cfm?version=3";

export default async function getLocations(query) {
    const response = await axios.get(LOCATIONS_URI);
    const locations = await processLocations(response.data, query);
    return locations;
}
