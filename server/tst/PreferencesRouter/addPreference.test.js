import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";
import addPreference from "../../src/routers/PreferencesRouter/addPreference";
import firebaseTest from "../config/firebaseTest";
import { E_BAD_PREF_POST_REQ } from "../../src/config/constants";
import * as responses from "./responses";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
});

test('addPreference() -- basic normal function', async () => {
    await expect(
        addPreference("fakeToken", "alcohol")
    ).resolves.toBeUndefined();
    await expect(firestore.doc).toHaveBeenCalledWith("preferences/users");
    await expect(firestore.doc("preferences/users").update).toHaveBeenCalledWith(
        responses.fakeResponse
    );

});

test("addPreference() -- bad request", async () => {
    await expect(addPreference(undefined, 987654321)).rejects.toThrow(
        E_BAD_PREF_POST_REQ
    );
    await expect(addPreference(123456789, undefined)).rejects.toThrow(
        E_BAD_PREF_POST_REQ
    );
});