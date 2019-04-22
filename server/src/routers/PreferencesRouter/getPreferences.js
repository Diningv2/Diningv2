import firestore from "../../config/firebase/firebaseConfig";

import * as constants from "../../config/constants";

export default async function getPreferences(token) {
    var preferencesDoc = undefined;
    try {
        preferencesDoc = await firestore.doc("preferences/users").get();
    } catch (e) {
        throw new Error(constants.E_DB_READ + e);
    }
    if (!preferencesDoc.exists) {
        throw new Error(constants.E_DB_NOENT + "favorites/users");
    } else if (!token) {
        throw new Error(constants.E_BAD_PREF_GET_REQ);
    }
    return token in preferencesDoc.data()
        ? preferencesDoc.data()[token]
        : emptyPreferences;
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
