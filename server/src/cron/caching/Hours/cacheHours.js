import firestore from "../../../config/firebase/firebaseConfig";

import getAllHours from "./getAllHours";
import { E_DB_WRITE, E_NO_API_RES } from "../../../config/constants";

/**
 * Caches the hours for each dining hall to speed up locations on app startup
 *
 * @param No parameters
 *
 * @return No Return
 *
 * Updates firebase, after calling getAllHours()
 * 
 */

export default async function cacheHours() {
	var hours = undefined;
    try {
        hours = await getAllHours();
    } catch (e) {
        console.log(e);
        throw new Error(E_NO_API_RES);
    }

    try {
        hours &&
            (await firestore
                .doc("locations/hours")
                .set(hours));
    } catch (e) {
        console.error(E_DB_WRITE + e);
    }
}