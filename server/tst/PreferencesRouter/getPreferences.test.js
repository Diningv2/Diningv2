import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

import getPreferences from "../../src/routers/PreferencesRouter/getPreferences";
import firebaseTest from "../config/firebaseTest";
import * as constants from "../../src/config/constants";
import * as responses from "./responses";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    console.error = jest.fn();
});

test('getFavorites() -- basic normal function', async () => {
	firebaseTest();
    await expect(getPreferences(123456789)).resolves.toEqual(
        responses.emptyPreferences
    ); 
});

test('getFavorites() -- firebase error', async () => {
	firebaseTest(1);
    await expect(getPreferences(123456789)).rejects
    	.toThrow(constants.E_DB_NOENT + "preferences/users"); 
});

test("getFavorites() -- bad request", async () => {
	firebaseTest();
    await expect(getPreferences(undefined)).rejects.toThrow(
        constants.E_BAD_PREF_GET_REQ
    );
});