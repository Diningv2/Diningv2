/*
 *   getMenuItemList(columns, data)
 *
 *   Summary:
 *       Transforms the data returned by the Yale Dining API into a list of MenuItem objects
 *
 *   Parameters:
 *       columns - an array returned by the Yale Dining API describing the organization of the data in data
 *       data - an array of arrays of dining hall data returned from the Yale Dining API, each corresponding to a menu item
 *
 *   Return Value:
 *       an array of MenuItem objects, or undefined if no items were extracted
 */
export default function getMenuItemList(columns, data) {
    // map API response to new format
    const menu = data.map(entry => {
        return !entry || !entry.length
            ? undefined
            : {
                  name: entry[columns.indexOf("MENUITEM")].replace("`", "'"),
                  itemID: entry[columns.indexOf("MENUITEMID")]
              };
    });
    // filter out undefined and duplicate entries
    const filteredMenu = menu
        .filter(entry => entry != undefined)
        .filter(
            (entry, index, self) =>
                index ===
                self.findIndex(
                    otherEntry =>
                        otherEntry.name === entry.name &&
                        otherEntry.itemID === entry.itemID
                )
        );
    return filteredMenu.length ? filteredMenu : undefined;
}
