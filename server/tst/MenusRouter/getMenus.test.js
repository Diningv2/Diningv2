import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

import getMenus from "../../src/routers/MenusRouter/getMenus";
import getOneMenu from "../../src/routers/MenusRouter/getOneMenu";
import getCachedMenu from "../../src/routers/MenusRouter/getCachedMenu";

import firebaseTest from "../config/firebaseTest";
import locations from "../../src/config/locations";
import * as responses from "./responses";

jest.mock("../../src/routers/MenusRouter/getOneMenu");
jest.mock("../../src/routers/MenusRouter/getCachedMenu");

beforeEach(() => {
    firebaseTest();
    console.error = jest.fn();
});

test("getMenus() -- no location query", async () => {
    getCachedMenu.mockImplementationOnce(
        () => responses.multiMenuExpectedResponse
    );
    await expect(getMenus({})).resolves.toEqual(
        responses.multiMenuExpectedResponse
    );
    expect(getCachedMenu).toHaveBeenCalledWith({});
    getCachedMenu.mockImplementationOnce(
        () => responses.multiMenuExpectedResponse
    );
    await expect(getMenus({ location: "all" })).resolves.toEqual(
        responses.multiMenuExpectedResponse
    );
    expect(getCachedMenu).toHaveBeenCalledWith({});
});

test("getMenus() -- location query", async () => {
    getOneMenu.mockImplementationOnce(() => responses.fullMenuExpectedResponse);
    await expect(getMenus({ location: 5 })).resolves.toEqual(
        responses.fullMenuExpectedResponse
    );
    expect(getOneMenu).toHaveBeenCalledWith({ location: 5 });
});
