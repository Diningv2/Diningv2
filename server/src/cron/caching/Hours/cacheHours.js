import firestore from "../../../config/firebase/firebaseConfig";

import getAllHours from "./getAllHours";
import { E_DB_WRITE, E_NO_API_RES } from "../../../config/constants";

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