import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import removeFavorite from "../../src/routers/FavoritesRouter/removeFavorite";
import firebaseTest from "../config/firebaseTest";
import { E_BAD_FAVE_POST_REQ } from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
    removeFavorite(123456789, 987654321);
});

test("removeFavorite() -- normal function", async () => {
    await expect(removeFavorite(123456789, 987654321)).resolves.toBeUndefined();
});

test('removeFavorite() -- menuItems', async () => {
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/menuItems");
});

test('removeFavorite() -- users', async () => {
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/users");
});

test('removeFavorite() -- menuItems update', async () => {
    await expect(firestore.doc("favorites/menuItems").update).toHaveBeenCalledWith({987654321: "ExponentPushToken[123456789]"});
});

test('removeFavorite() -- users update', async () => {
    await expect(firestore.doc("favorites/users").update).toHaveBeenCalledWith({123456789: 987654321});
});

test('removeFavorite() -- arrayUnion menuItems', async () => {
    await expect(firebase.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith("ExponentPushToken[123456789]");
});

test('removeFavorite() -- arrayUnion users', async () => {
    await expect(firebase.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith(987654321);
});

test("removeFavorite() -- bad request", async () => {
    await expect(removeFavorite(undefined, 123456789)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
    await expect(removeFavorite(123456789, undefined)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
    await expect(removeFavorite(undefined, undefined)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
});
