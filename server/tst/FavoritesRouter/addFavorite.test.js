import addFavorite from "../../src/routers/FavoritesRouter/addFavorite";
import firestore from "../../src/config/firebase/firebaseConfig";

jest.mock("../../src/config/firebase/firebaseConfig");

beforeEach(() => {
    firestore.doc = jest.fn();
    firestore.doc.update = jest.fn();
    console.error = jest.fn();
});

test("addFavorite() -- normal function", async () => {
    await expect(addFavorite(123456789, 987654321)).resolves.toBeUndefined();
});

test("addFavorite() -- bad request", async () => {
    await expect(addFavorite(undefined, 123456789)).rejects.toThrow(
        "Push token and item ID are required"
    );
    await expect(addFavorite(123456789, undefined)).rejects.toThrow(
        "Push token and item ID are required"
    );
    await expect(addFavorite(undefined, undefined)).rejects.toThrow(
        "Push token and item ID are required"
    );
});
