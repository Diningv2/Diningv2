import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import removeFavorite from "../../src/routers/FavoritesRouter/removeFavorite";
import firebaseTest from "../config/firebaseTest";
import { E_BAD_FAVE_POST_REQ } from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
});

test("removeFavorite() -- normal function", async () => {
    await expect(removeFavorite(123456789, 987654321)).resolves.toBeUndefined();
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/menuItems");
    await expect(firestore.doc).toHaveBeenCalledWith("favorites/users");
    await expect(firestore.doc("favorites/menuItems").update).toHaveBeenCalledWith({
        987654321: 123456789
    });
    await expect(firestore.doc("favorites/users").update).toHaveBeenCalledWith({
        123456789: "987654321"
    });
    await expect(firebase.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith(
        123456789
    );
    await expect(firebase.firestore.FieldValue.arrayRemove).toHaveBeenCalledWith(
        "987654321"
    );

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
