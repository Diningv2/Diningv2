"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMenus;

var _getOneMenu = _interopRequireDefault(require("./getOneMenu"));

var _getAllMenus = _interopRequireDefault(require("./getAllMenus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getMenus(query) {
  if (!("location" in query) || query.location == "all") {
    const menus = await (0, _getAllMenus.default)(query);
    return menus;
  } else {
    const menu = await (0, _getOneMenu.default)(query);
    return menu;
  }
}