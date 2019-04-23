import firestore from "../../config/firebase/firebaseConfig";

import { E_BAD_PREF_POST_REQ, E_DB_WRITE } from "../../config/constants";

export default async function removePreference(token, preference) {
    if (!token || !preference || !(preference in emptyPreferences)) {
        throw new Error(E_BAD_PREF_POST_REQ);
    }
    try {
        const preferences = await firestore.doc("preferences/users").get();
        await firestore.doc("preferences/users").update({
            [token]: { ...preferences[token], [preference]: false }
        });
    } catch (e) {
        throw new Error(E_DB_WRITE + e);
    }
}

const emptyPreferences = {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    alcohol: false,
    nuts: false,
    shellfish: false,
    peanut: false,
    dairy: false,
    eggs: false,
    pork: false,
    fishSeafood: false,
    soy: false,
    wheat: false,
    gluten: false
};
