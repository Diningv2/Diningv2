import getMenuItemsToday from "./getMenuItemsToday";
import getPushTokens from "./getPushTokens";

export default async function sendNotifications() {
    const menuItems = await getMenuItemsToday();
    const tokens = await getPushTokens(menuItems);
    // TODO: call method to send the push tokens to expo
    return tokens;
}
