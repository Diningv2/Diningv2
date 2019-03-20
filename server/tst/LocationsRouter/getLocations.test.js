import axios from "axios";

import getLocations from "../../src/routers/LocationsRouter/getLocations";
import processLocations from "../../src/routers/LocationsRouter/processLocations";
import * as responses from "./responses";

jest.mock("axios");
jest.mock("../../src/routers/LocationsRouter/processLocations");

test("getLocations() -- normal function", async () => {
    axios.get.mockResolvedValue({ data: responses.locationResponse });
    processLocations.mockImplementationOnce(
        () => responses.allLocationsExpectedResponse
    );
    await expect(getLocations({})).resolves.toEqual(
        responses.allLocationsExpectedResponse
    );
});

test("getLocations() -- bad response from axios", async () => {
    axios.get.mockResolvedValue(undefined);
    await expect(getLocations({})).rejects.toThrow(
        "Cannot read property 'data' of undefined"
    );
});

test("getLocations() -- exception caught from axios", async () => {
    axios.get.mockImplementation(() => {
        throw new Error();
    });
    await expect(getLocations({ location: 5 })).rejects.toThrow();
});
