import removeFavorite from "../../src/routers/FavoritesRouter/removeFavorite";
import firestore from "../../src/config/firebase/firebaseConfig";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firestore.doc = jest.fn();
    firestore.doc.update = jest.fn();
    console.error = jest.fn();
});

test("removeFavorite() -- normal function", async () => {
    await expect(removeFavorite(123456789, 987654321)).resolves.toBeUndefined();
});

test("removeFavorite() -- bad request", async () => {
    await expect(removeFavorite(undefined, 123456789)).rejects.toThrow(
        "Push token and item ID are required"
    );
    await expect(removeFavorite(123456789, undefined)).rejects.toThrow(
        "Push token and item ID are required"
    );
    await expect(removeFavorite(undefined, undefined)).rejects.toThrow(
        "Push token and item ID are required"
    );
});
