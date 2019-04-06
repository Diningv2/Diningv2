import axios from "axios";

import getMenuIdInfo from "../../src/routers/MenuItemsRouter/getMenuIdInfo";
import parseMenuItemData from "../../src/routers/MenuItemsRouter/parseMenuItemData";
import * as responses from "../config/menuItemResponses";
import { E_NO_API_RES } from "../../src/config/constants";

jest.mock("axios");
jest.mock("../../src/routers/MenuItemsRouter/parseMenuItemData");

test("getMenuIdInfo() -- normal function", async () => {
    axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: responses.nutritionWaffleData })
    );
    axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: responses.filterWaffleData })
    );
    axios.get.mockImplementationOnce(() =>
        Promise.resolve({ data: responses.ingredientWaffleData })
    );
    parseMenuItemData.mockImplementationOnce(
        () => responses.menuItemDataResponse
    );
    await expect(getMenuIdInfo(5908402)).resolves.toEqual(
        responses.menuItemDataResponse
    );
    expect(parseMenuItemData).toHaveBeenCalledWith(
        responses.nutritionWaffleData,
        responses.filterWaffleData,
        responses.ingredientWaffleData
    );
});

test("getMenuIdInfo() -- bad response from axios", async () => {
    axios.get.mockResolvedValue(undefined);
    await expect(getMenuIdInfo(5908402)).rejects.toThrow(E_NO_API_RES);
});

test("getMenuIdInfo() -- exception caught from axios", async () => {
    axios.get.mockImplementation(() => Promise.reject());
    await expect(getMenuIdInfo(5908402)).rejects.toThrow(E_NO_API_RES);
});

test("getMenuIdInfo() -- exception caught from getMenuIdInfo()", async () => {
    axios.get.mockResolvedValue({ data: undefined });
    parseMenuItemData.mockImplementationOnce(() => {
        throw new Error(E_NO_API_RES);
    });
    await expect(getMenuIdInfo(5908402)).rejects.toThrow(E_NO_API_RES);
});
