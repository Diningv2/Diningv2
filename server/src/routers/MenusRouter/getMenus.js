import firestore from "../../config/firebase/firebaseConfig";

import diningLocations from "../../config/locations";
import * as constants from "../../config/constants";

export default async function getMenus(query) {
	const locations = (!query.location || query.location == "all") 
		? Object.values(diningLocations) 
		: [diningLocations[query.location]];
	console.log(`Locations ${locations}`)

	let todayDoc = undefined;
    let tomorrowDoc = undefined;
    try {
        todayDoc = await firestore.doc("menus/today").get();
        tomorrowDoc = await firestore.doc("menus/tomorrow").get();
    } catch (e) {
        throw new Error(constants.E_DB_READ + e);
    }
    if (!todayDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "menus/today");
    } else if (!tomorrowDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "menus/tomorrow");
    } else if (!query) {
        throw new Error(constants.E_BAD_FAVE_GET_REQ);
    }
    var menu = [];
    locations.forEach(location => {
    	// TODO: Deal with errors here
    	var menuEntry = {};
    	menuEntry["location"] = location;
    	menuEntry["today"] = todayDoc.data()[location];
    	menuEntry["tomorrow"] = tomorrowDoc.data()[location];
    	menu.push(menuEntry);
    });
    return menu;
}
