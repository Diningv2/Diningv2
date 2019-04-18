import { E_DB_NOENT, emptyMenu } from "../../config/constants";

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
        location in todayDoc.data() && todayDoc.data()[location]);
    const today = isFresh(timestamp) ? menu : {};
    ({ menu, timestamp } =
        location in tomorrowDoc.data() && tomorrowDoc.data()[location]);
    const tomorrow = isFresh(timestamp) ? menu : {};

    !isEmpty(today) && !isEmpty(tomorrow)
        ? console.log("Fetched menus from Firestore.")
        : console.error(
              `Failed to fetch menus from Firestore. ${
                  !isEmpty(today) || !isEmpty(tomorrow)
                      ? "(1 of 2)"
                      : "(2 of 2)"
              }`
          );
    return !isEmpty(today) || !isEmpty(tomorrow)
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

function isEmpty(menu) {
    return Object.keys(menu).map(meal => menu[meal].length).length > 0;
}
