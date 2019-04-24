import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

import getFavorites from "../../src/routers/FavoritesRouter/getFavorites";
import firebaseTest from "../config/firebaseTest";
import * as constants from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    console.error = jest.fn();
});

test('getFavorites() -- basic normal function', async () => {
	firebaseTest();
    await expect(getFavorites(123456789)).resolves.toEqual({}); 
});

test('getFavorites() -- firebase error', async () => {
	firebaseTest(2);
    await expect(getFavorites(123456789)).rejects
    	.toThrow(constants.E_DB_NOENT + "favorites/users"); 
    firebaseTest(3);
    await expect(getFavorites(123456789)).rejects
    	.toThrow(constants.E_DB_NOENT + "menus/menuItems"); 
    firebaseTest(4);
    await expect(getFavorites(123456789)).rejects
    	.toThrow(constants.E_DB_NOENT + "favorites/today"); 
});

test("getFavorites() -- bad request", async () => {
	firebaseTest();
    await expect(getFavorites(undefined)).rejects.toThrow(
        constants.E_BAD_FAVE_GET_REQ
    );
});