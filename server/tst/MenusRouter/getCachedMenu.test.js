import getCachedMenu from "../../src/routers/MenusRouter/getCachedMenu";
import * as responses from "./responses";

beforeAll(() => {
    const mockedDate = new Date(2019, 2, 1);
    global.Date = jest.fn(() => mockedDate);
});

test("getCachedMenu() -- normal function", async () => {
    await expect(getCachedMenu(5,responses.todayDoc ,responses.tomorrowDoc)).resolves
        .toEqual(responses.resultCachedMenu);
});

test("getCachedMenu() -- todayDoc doesn't exist", async () => {
    await expect(getCachedMenu(5, {exists: false} ,{exists: true})).resolves
        .toEqual(undefined);
});

test("getCachedMenu() -- tomorrowDoc doesn't exist", async () => {
    await expect(getCachedMenu(5, {exists: true} ,{exists: false})).resolves
        .toEqual(undefined);
});

test("getCachedMenu() -- stale timestamp", async () => {
    await expect(getCachedMenu(5,responses.todayDocStale ,responses.tomorrowDocStale)).resolves
        .toEqual(undefined);
});

