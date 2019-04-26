import firestore from "../../src/config/firebase/firebaseConfig";
import * as firebase from "firebase-admin";

import firebaseTest from "../config/firebaseTest";
import processLocations from "../../src/routers/LocationsRouter/processLocations";
import getOneLocation from "../../src/routers/LocationsRouter/getOneLocation";
import * as responses from "./responses";

import locations from "../../src/config/locations";

jest.mock("../../src/routers/LocationsRouter/getOneLocation");

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => (console.error = jest.fn()));
afterEach(() => {
    console.error.mockClear();
    getOneLocation.mockClear();
});

test("processLocations() -- normal function with location", async () => {
    firebaseTest();
    getOneLocation.mockImplementationOnce(
        () => responses.morseExpectedResponse
    );
    await expect(
        processLocations(responses.locationResponse, { location: 5 })
    ).resolves.toEqual(responses.morseExpectedResponse);
});

test("processLocations() -- normal function without location", async () => {
    firebaseTest();
    getOneLocation.mockImplementation((_data, query) => {
        switch (query.location) {
            case "5":
                return responses.morseExpectedResponse;
            case "24":
                return responses.stilesExpectedResponse;
            default:
                throw new Error("Empty object returned from YaleDining API");
        }
    });
    await expect(
        processLocations(responses.locationResponse, {})
    ).resolves.toEqual(responses.allLocationsExpectedResponse);
    expect(getOneLocation).toHaveBeenCalledTimes(Object.keys(locations).length);
    expect(console.error).toHaveBeenCalledTimes(
        Object.keys(locations).length - 2
    );
});

test("processLocations() -- throws on bad response from YaleDining", async () => {
    firebaseTest();
    await expect(processLocations({}, { location: 5 })).rejects.toThrow(
        "Empty object returned from YaleDining API"
    );
});

test("processLocations() -- throws on bad response from getOneLocation() with location", async () => {
    firebaseTest();
    getOneLocation.mockImplementationOnce(() => {
        throw new Error("Empty object returned from YaleDining API");
    });
    await expect(
        processLocations(responses.locationResponse, { location: 5 })
    ).rejects.toThrow("Empty object returned from YaleDining API");
    expect(getOneLocation).toHaveBeenCalledTimes(1);
});

test("processLocations() -- throws on bad response from getOneLocation() without location", async () => {
    firebaseTest();
    getOneLocation.mockImplementation(() => {
        throw new Error("Empty object returned from YaleDining API");
    });
    await expect(
        processLocations(responses.locationResponse, {})
    ).rejects.toThrow("Empty object returned from YaleDining API");
    expect(getOneLocation).toHaveBeenCalledTimes(Object.keys(locations).length);
    expect(console.error).toHaveBeenCalledTimes(Object.keys(locations).length);
});
