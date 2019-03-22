import axios from "axios";

import getHours from "../../src/routers/LocationsRouter/getHours";
import * as responses from "./responses";

jest.mock("axios");

beforeAll(() => {
    const mockedDate = new Date(2019, 2, 1);
    global.Date = jest.fn(() => mockedDate);
});

test("getHours() -- normal function today", async () => {
    axios.get.mockResolvedValue({ data: responses.singleMenu });
    await expect(getHours(5, 0)).resolves.toEqual(
        responses.singleLocationToday
    );
});

test("getHours() -- normal function tomorrow", async () => {
    axios.get.mockResolvedValue({ data: responses.singleMenu });
    await expect(getHours(5, 1)).resolves.toEqual(
        responses.singleLocationTomorrow
    );
});

test("getHours() -- bad response from YaleDining", async () => {
    axios.get.mockResolvedValue({ data: responses.emptyMenu });
    await expect(getHours({ location: 5 }, 0)).rejects.toThrow(
        "Empty object returned from YaleDining API"
    );
});

test("getHours() -- bad response from axios", async () => {
    axios.get.mockResolvedValue(undefined);
    await expect(getHours({ location: 5 }, 0)).rejects.toThrow(
        "Cannot read property 'data' of undefined"
    );
});

test("getHours() -- exception caught from axios", async () => {
    axios.get.mockImplementation(() => {
        throw new Error();
    });
    await expect(getHours({ location: 5 }, 0)).rejects.toThrow();
});
