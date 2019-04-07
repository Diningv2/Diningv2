import getOneLocation from "../../src/routers/LocationsRouter/getOneLocation";
import getHours from "../../src/routers/LocationsRouter/getHours";
import * as responses from "./responses";
import { E_BAD_LOC_REQ, E_NO_API_RES } from "../../src/config/constants";

jest.mock("../../src/routers/LocationsRouter/getHours");

beforeAll(() => (console.error = jest.fn()));
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
    ).rejects.toThrow(E_BAD_LOC_REQ);
});

test("getOneLocation() -- logs when getHours() throws", async () => {
    getHours.mockImplementationOnce(() => {
        throw new Error(E_NO_API_RES);
    });
    await expect(
        getOneLocation(responses.locationResponse, { location: 5 })
    ).resolves.toEqual(responses.morseExpectedResponseEmpty);
    expect(console.error).toHaveBeenCalled();
});
