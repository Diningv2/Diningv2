import { E_DB_NOENT } from "../../config/constants";

export default async function getCachedMenuItemInfo(itemID, menuItemsDoc) {
    console.log(`Fetching data for ${itemID} from Firestore cache...`);
    if (!menuItemsDoc.exists) {
        console.error(`${E_DB_NOENT}: menuItems/itemID`);
        return undefined;
    }
    itemID in menuItemsDoc.data()
        ? console.log(`Successfully fetched ${itemID} from cache.`)
        : console.log(`Failed to fetch ${itemID} from cache.`);
    return itemID in menuItemsDoc.data()
        ? reorderKeys(menuItemsDoc.data()[itemID])
        : undefined;
}

function reorderKeys(response) {
    return {
        name: response.name,
        itemID: response.itemID,
        allergens: response.allergens,
        ingredients: response.ingredients,
        nutrition: response.nutrition,
        isVegan: response.isVegan,
        isVegetarian: response.isVegetarian,
        isGlutenFree: response.isGlutenFree,
        hasInfo: response.hasInfo
    };
}
