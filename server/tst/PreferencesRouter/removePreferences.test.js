import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import removePreferences from "../../src/routers/PreferencesRouter/removePreference";
import firebaseTest from "../config/firebaseTest";
import { E_BAD_PREF_POST_REQ } from "../../src/config/constants";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
});

test("removePreferences() -- normal function", async () => {
    await expect(removePreferences("fakeToken", "eggs")).resolves.toBeUndefined();
    await expect(firestore.doc).toHaveBeenCalledWith("preferences/users");
    await expect(firestore.doc("preferences/users").update).toHaveBeenCalledWith({
        "fakeToken": {"eggs": false}
    });
});

test("removePreferences() -- bad request", async () => {
    await expect(removePreferences(undefined, 123456789)).rejects.toThrow(
        E_BAD_PREF_POST_REQ
    );
    await expect(removePreferences(123456789, undefined)).rejects.toThrow(
        E_BAD_PREF_POST_REQ
    );
});
