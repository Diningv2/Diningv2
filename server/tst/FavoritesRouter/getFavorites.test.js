import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

import getFavorites from "../../src/routers/FavoritesRouter/getFavorites";
import firebaseTest from "../config/firebaseTest";
import * as constants from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
});

test('getFavorites() -- basic normal function', async () => {
    await expect(getFavorites(123456789)).resolves.toEqual({}); 
});

test("getFavorites() -- bad request", async () => {
    await expect(getFavorites(undefined)).rejects.toThrow(
        constants.E_BAD_FAVE_GET_REQ
    );
});