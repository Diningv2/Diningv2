import { E_DB_NOENT } from "../../config/constants";

export default async function getCachedMenu(location, todayDoc, tomorrowDoc) {
    console.log(`Fetching data for ${location} from Firestore cache...`);
    if (!todayDoc.exists) {
        console.error(E_DB_NOENT + "menus/today");
        return undefined;
    } else if (!tomorrowDoc.exists) {
        console.error(E_DB_NOENT + "menus/tomorrow");
        return undefined;
    }
    var menu, timestamp;
    ({ menu, timestamp } =
        [location] in todayDoc.data() && todayDoc.data()[location]);
    const today = isFresh(timestamp) ? menu : undefined;
    ({ menu, timestamp } =
        [location] in tomorrowDoc.data() && tomorrowDoc.data()[location]);
    const tomorrow = isFresh(timestamp) ? menu : undefined;
    today && tomorrow
        ? console.log("Fetched menus from Firestore.")
        : console.error("Failed to fetch menus from Firestore.");
    return today && tomorrow
        ? {
              location,
              today,
              tomorrow
          }
        : undefined;
}

function isFresh(timestamp) {
    const date = new Date();
    return date.toDateString() == timestamp;
}
