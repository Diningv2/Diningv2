import getOneMenu from "./getOneMenu";
import getAllMenus from "./getAllMenus";

export default async function getMenus(query) {
    if (!("location" in query) || query.location == "all") {
        const menus = await getAllMenus(query);
        return menus;
    } else {
        const menu = await getOneMenu(query);
        return menu;
    }
}
