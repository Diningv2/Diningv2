import firestore from "../config/firebase/firebaseConfig";

export default async function getPushTokens(menuItems) {
    let menuItemsDoc = undefined;
    try {
        menuItemsDoc = await firestore.doc("favorites/menuItems").get();
    } catch (e) {
        throw new Error("Error getting document: " + e);
    }
    if (!menuItemsDoc.exists) {
        throw new Error("Document favorites/menuItems does not exist");
    } else if (!menuItems) {
        throw new Error("No menus received for today");
    }
    var expoTokens = [];
    menuItems.forEach(async menuItem => {
        if (menuItemsDoc.data()[menuItem.itemID]) {
            menuItemsDoc.data()[menuItem.itemID].forEach(token =>
                expoTokens.push({
                    name: menuItem.name,
                    meal: menuItem.meal,
                    token: token
                })
            );
        } else {
            await firestore
                .doc("favorites/menuItems")
                .update({ [menuItem.itemID]: [] });
        }
    });
    const tokens = expoTokens.map(token => {
        // TODO: add extra information to the body
        let body = token.name + " is being served today!";
        return {
            to: token.token,
            sound: "default",
            body: body,
            data: {}
        };
    });
    return tokens;
}
