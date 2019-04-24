import axios from "axios";

import getOneMenu from "../../src/routers/MenusRouter/getOneMenu";
import processMenu from "../../src/routers/MenusRouter/processMenu";
import locations from "../../src/config/locations";
import * as responses from "./responses";
import {E_NO_API_RES, E_BAD_MENU_REQ} from "../../src/config/constants";

jest.mock("axios");
jest.mock("../../src/routers/MenusRouter/processMenu");

test("getOneMenu() -- normal function", async () => {
    axios.get.mockResolvedValue(responses.singleMenu);
    processMenu.mockImplementationOnce(
        (x) => responses.fullMenuExpectedResponse
    );
    await expect(getOneMenu(5)).resolves.toEqual(
        responses.fullMenuExpectedResponse
    );
    expect(processMenu).toHaveBeenCalledWith(responses.singleMenu);
});

test("getOneMenu() -- bad response from axios", async () => {
    axios.get.mockResolvedValue(undefined);
    processMenu.mockImplementationOnce(() => {
        throw new Error(E_NO_API_RES);
    });
    await expect(getOneMenu(5)).rejects.toThrow(
        E_NO_API_RES
    );
});

test("getOneMenu() -- location argument out of range", async () => {
    await expect(getOneMenu(100)).rejects.toThrow(
        E_BAD_MENU_REQ
    );
});

test("getOneMenu() -- exception caught from axios", async () => {
    axios.get.mockImplementation(() => {
        throw new Error();
    });
    await expect(getOneMenu(5)).rejects.toThrow();
});

test("getOneMenu() -- exception caught from processMenu()", async () => {
    axios.get.mockResolvedValue({ data: undefined });
    processMenu.mockImplementationOnce(() => {
        throw new Error(E_NO_API_RES);
    });
    await expect(getOneMenu(5)).rejects.toThrow(
        E_NO_API_RES
    );
});
