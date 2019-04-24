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
afterEach(() => console.error.mockClear());

test("getMenus() -- no location query", async () => {
    getOneMenu
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[0])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[1])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[2])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[3])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[4])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[5])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[6])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[7])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[8])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[9])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[10])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[11])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[12])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[13])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[14])
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[15]);
    await expect(getMenus({})).resolves.toEqual(
        responses.allMenusExpectedResponse
    );
});

test("getMenus() -- dhalls throw error", async () => {
    getOneMenu
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => responses.allMenusExpectedResponse[15]);
    await expect(getMenus({})).resolves.toEqual([responses.allMenusExpectedResponse[15]]);

     getOneMenu
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")})
        .mockImplementationOnce(() => {throw new Error("error")});
    await expect(getMenus({})).rejects.toThrow("error");
});

test("getMenus() -- location query", async () => {
    getOneMenu.mockImplementationOnce(() => responses.fullMenuExpectedResponse[0]);
    await expect(getMenus({ location: 5 })).resolves.toEqual(
        responses.fullMenuExpectedResponse
    );
    expect(getOneMenu).toHaveBeenCalledWith(5);
});
