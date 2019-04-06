import getAllMenus from "../../src/routers/MenusRouter/getAllMenus";
import getOneMenu from "../../src/routers/MenusRouter/getOneMenu";
import * as responses from "./responses";
import locations from "../../src/config/locations";
import { E_NO_API_RES } from "../../src/config/constants";

jest.mock("../../src/routers/MenusRouter/getOneMenu");

beforeEach(() => (console.error = jest.fn()));
afterEach(() => console.error.mockClear());

test("getAllMenus() -- normal function with meal query", async () => {
    getOneMenu.mockImplementation(query => {
        switch (query.location) {
            case "3":
                return responses.hopperDinnerMenu;
            case "4":
                return responses.davenportDinnerMenu;
            case "5":
                return responses.morseDinnerMenu;
            default:
                throw new Error(E_NO_API_RES);
        }
    });
    await expect(getAllMenus({ meal: "dinner" })).resolves.toEqual(
        responses.multiDinnerMenu
    );
    expect(console.error).toHaveBeenCalledTimes(
        Object.keys(locations).length - 3
    );
});

test("getAllMenus() -- normal function without meal query", async () => {
    getOneMenu.mockImplementation(query => {
        switch (query.location) {
            case "3":
                return responses.hopperMenu;
            case "4":
                return responses.davenportMenu;
            case "5":
                return responses.morseMenu;
            default:
                throw new Error(E_NO_API_RES);
        }
    });
    await expect(getAllMenus({})).resolves.toEqual(
        responses.multiMenuExpectedResponse
    );
    expect(console.error).toHaveBeenCalledTimes(
        Object.keys(locations).length - 3
    );
});

test("getAllMenus() -- normal function with meal query with duplicates", async () => {
    getOneMenu.mockImplementation(query => {
        switch (query.location) {
            case "3":
                return responses.hopperDinnerMenu;
            case "4":
                return responses.davenportDinnerMenu;
            case "5":
                return responses.morseDinnerMenuDuplicate;
            default:
                throw new Error(E_NO_API_RES);
        }
    });
    await expect(getAllMenus({ meal: "dinner" })).resolves.toEqual(
        responses.multiDinnerMenu
    );
    expect(console.error).toHaveBeenCalledTimes(
        Object.keys(locations).length - 3
    );
});

test("getAllMenus() -- bad response from all dinining halls", async () => {
    getOneMenu.mockImplementation(() => {
        throw new Error(E_NO_API_RES);
    });
    await expect(getAllMenus({})).rejects.toThrow(E_NO_API_RES);
    expect(console.error).toHaveBeenCalledTimes(Object.keys(locations).length);
});
