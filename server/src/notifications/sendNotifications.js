import getMenuItemsToday from "./getMenuItemsToday";
import getPushTokens from "./getPushTokens";
import push from "./push";

export default async function sendNotifications() {
    const menuItems = await getMenuItemsToday();
    const tokens = await getPushTokens(menuItems);
    push(tokens);
    return tokens;
}
