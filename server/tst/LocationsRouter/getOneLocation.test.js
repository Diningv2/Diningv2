import getOneLocation from "../../src/routers/LocationsRouter/getOneLocation";
import getHours from "../../src/routers/LocationsRouter/getHours";
import * as responses from "./responses";

jest.mock("../../src/routers/LocationsRouter/getHours");

beforeEach(() => getHours.mockClear());

test("getOneLocation() -- normal function", async () => {
    getHours.mockImplementationOnce(() => responses.singleLocationToday);
    getHours.mockImplementationOnce(() => responses.singleLocationTomorrow);
    await expect(
        getOneLocation(responses.locationResponse, { location: 5 })
    ).resolves.toEqual(responses.morseExpectedResponse);
    expect(getHours).toHaveBeenNthCalledWith(1, 5, 0);
    expect(getHours).toHaveBeenNthCalledWith(2, 5, 1);

    getHours.mockImplementationOnce(() => responses.singleLocationToday);
    getHours.mockImplementationOnce(() => responses.singleLocationTomorrow);
    await expect(
        getOneLocation(responses.locationResponse, { location: 24 })
    ).resolves.toEqual(responses.stilesExpectedResponse);
    expect(getHours).toHaveBeenNthCalledWith(3, 24, 0);
    expect(getHours).toHaveBeenNthCalledWith(4, 24, 1);
});

test("getOneLocation() -- throws on invalid location", async () => {
    await expect(
        getOneLocation(responses.locationResponse, { location: 999 })
    ).rejects.toThrow("Invalid location request");
});

test("getOneLocation() -- throws when getHours() throws", async () => {
    getHours.mockImplementationOnce(() => {
        throw new Error("Empty object returned from YaleDining API");
    });
    await expect(
        getOneLocation(responses.locationResponse, { location: 5 })
    ).rejects.toThrow("Empty object returned from YaleDining API");
});
