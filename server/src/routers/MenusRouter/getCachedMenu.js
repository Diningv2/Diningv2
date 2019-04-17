import { E_DB_NOENT } from "../../config/constants";

export default async function getCachedMenu(location, todayDoc, tomorrowDoc) {
    if (!todayDoc.exists) {
        console.error(E_DB_NOENT + "menus/today");
        return undefined;
    } else if (!tomorrowDoc.exists) {
        console.error(E_DB_NOENT + "menus/tomorrow");
        return undefined;
    }
    var menu, timestamp;
    ({ menu, timestamp } = todayDoc.data()[location]);
    const today = isFresh(timestamp) ? menu : undefined;
    ({ menu, timestamp } = tomorrowDoc.data()[location]);
    const tomorrow = isFresh(timestamp) ? menu : undefined;
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
