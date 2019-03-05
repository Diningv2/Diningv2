"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMenu;

function getMenu(columns, data) {
  // map API response to new format
  const menu = data.map(entry => {
    if (!entry || !entry.length) return null;
    var menuItem = {};
    menuItem['name'] = entry[columns.indexOf('MENUITEM')];
    menuItem['itemID'] = entry[columns.indexOf('MENUITEMID')];
    return menuItem;
  }); // filter out null and duplicate entries

  const filteredMenu = menu.filter(entry => entry != null).filter((entry, index, self) => self.findIndex(otherEntry => otherEntry.name === entry.name && otherEntry.itemID === entry.itemID) === index);
  return filteredMenu.length ? filteredMenu : null;
}