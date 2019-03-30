"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOneMenu;

var _axios = _interopRequireDefault(require("axios"));

var _processMenu = _interopRequireDefault(require("./processMenu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MENUS_URI = "http://www.yaledining.org/fasttrack/menus.cfm?version=3";
/*
 *   getOneMenu(query)
 *
 *   Summary:
 *       Queries the Yale Dining API for a single location and converts the returned data into a list of either Menus objects or MenuItem objects
 *
 *   Parameters:
 *       query - the query object parsed from the request
 *
 *   Return Value:
 *       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
 */

async function getOneMenu(query) {
  const endpoint = MENUS_URI + "&location=" + query.location;
  const response = await _axios.default.get(endpoint);
  return (0, _processMenu.default)(response.data, query);
}