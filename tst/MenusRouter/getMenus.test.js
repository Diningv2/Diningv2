import getMenus from "../../src/routers/MenusRouter/getMenus";
import getOneMenu from "../../src/routers/MenusRouter/getOneMenu";
import getAllMenus from "../../src/routers/MenusRouter/getAllMenus";
import * as responses from "./responses";

jest.mock("../../src/routers/MenusRouter/getOneMenu");
jest.mock("../../src/routers/MenusRouter/getAllMenus");

test("getMenus() -- no location query", async () => {
    getAllMenus.mockImplementationOnce(
        () => responses.multiMenuExpectedResponse
    );
    await expect(getMenus({})).resolves.toEqual(
        responses.multiMenuExpectedResponse
    );
    expect(getAllMenus).toHaveBeenCalledWith({});
    getAllMenus.mockImplementationOnce(
        () => responses.multiMenuExpectedResponse
    );
    await expect(getMenus({ location: "all" })).resolves.toEqual(
        responses.multiMenuExpectedResponse
    );
    expect(getAllMenus).toHaveBeenCalledWith({});
});

test("getMenus() -- location query", async () => {
    getOneMenu.mockImplementationOnce(() => responses.fullMenuExpectedResponse);
    await expect(getMenus({ location: 5 })).resolves.toEqual(
        responses.fullMenuExpectedResponse
    );
    expect(getOneMenu).toHaveBeenCalledWith({ location: 5 });
});
