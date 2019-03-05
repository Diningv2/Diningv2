"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOneMenu;

var _axios = _interopRequireDefault(require("axios"));

var _processMenu = _interopRequireDefault(require("./processMenu"));

var _locations = _interopRequireDefault(require("../../config/locations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MENUS_URI = 'http://www.yaledining.org/fasttrack/menus.cfm?version=3';
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
*
*   Throws:
*       when an exception is caught from the request to the Yale Dining API or the call to processMenu()
*/

async function getOneMenu(query) {
  const endpoint = MENUS_URI + '&location=' + query.location;

  try {
    const response = await _axios.default.get(endpoint);
    const menu = (0, _processMenu.default)(response.data, query);
    return menu;
  } catch (e) {
    throw new Error('Empty object returned for: ' + _locations.default[query.location]);
  }
}