import axios from "axios";

import processLocations from "./processLocations";
import { LOCATIONS_URI } from "../../config/constants";

export default async function getLocations(query) {
    const response = await axios.get(LOCATIONS_URI);
    const locations = await processLocations(response.data, query);
    return locations;
}
