import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import addFavorite from "../../src/routers/FavoritesRouter/addFavorite";
import firebaseTest from "../config/firebaseTest";
import { E_BAD_FAVE_POST_REQ } from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
    addFavorite(123456789, 987654321, "DummyMenuItem");
});

test('addFavorite() -- basic normal function', async () => {
    await expect(
        addFavorite(123456789, 987654321, "DummyMenuItem")
    ).resolves.toBeUndefined();
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/menuItems");
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/users");
    await expect(firestore.doc).toHaveBeenCalledWith("menus/menuItems");
    await expect(firestore.doc("favorites/menuItems").update).toHaveBeenCalledWith({
        987654321: "ExponentPushToken[123456789]"
    });
    await expect(firestore.doc("favorites/users").update).toHaveBeenCalledWith({
        123456789: 987654321
    });
    await expect(firestore.doc("menus/menuItems").update).toHaveBeenCalledWith({
        987654321: "DummyMenuItem"
    });
    await expect(firebase.firestore.FieldValue.arrayUnion).toHaveBeenCalledWith(
        "ExponentPushToken[123456789]"
    );
    await expect(firebase.firestore.FieldValue.arrayUnion).toHaveBeenCalledWith(
        987654321
    );

});

test("addFavorite() -- bad request", async () => {
    await expect(addFavorite(undefined, 987654321)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
    await expect(addFavorite(123456789, undefined)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
    await expect(addFavorite(undefined, undefined)).rejects.toThrow(
        E_BAD_FAVE_POST_REQ
    );
});