"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processMenu;

var _getMenuItemList = _interopRequireDefault(require("./getMenuItemList"));

var _mealNames = _interopRequireDefault(require("../../config/mealNames"));

var _monthName = _interopRequireDefault(require("../../config/monthName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* 
*   processMenu(data, query)
*
*   Summary:
*       Transforms the data returned by the Yale Dining API for a single location into a list of either Menus objects or MenuItem objects
*
*   Parameters:
*       data - the object returned by the Yale Dining API for a specific location
*       query - the query object parsed from the request
*
*   Return Value:
*       an array of [MenuItem | Menus] objects, depending on whether the query object contains the meal key or not (respectively)
*
*   Throws:
*       when the data.DATA entry is null, empty, or contains only an empty list
*/
function processMenu(data, query) {
  // throw on bad response from Yale Dining
  if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
    throw new Error('Empty object returned from YaleDining API');
  } // get date for menus -- relies on the fact that server is on EST/EDT


  const date = new Date();
  const today = _monthName.default[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear() + ' 00:00:00'; // meal query -- return a list of MenuItem objects

  if ('meal' in query) {
    const filteredData = data.DATA.filter(entry => _mealNames.default[entry[data.COLUMNS.indexOf('MEALNAME')]] == query.meal && entry[data.COLUMNS.indexOf('MENUDATE')] == today);
    return (0, _getMenuItemList.default)(data.COLUMNS, filteredData);
  } // location query -- return a list of Menus objects
  else {
      var menus = {}; // all locations are the same for each call

      menus['location'] = data.DATA[0][data.COLUMNS.indexOf('LOCATION')];

      for (var mealName in _mealNames.default) {
        const filteredData = data.DATA.filter(entry => entry[data.COLUMNS.indexOf('MEALNAME')] === mealName && entry[data.COLUMNS.indexOf('MENUDATE')] === today);
        menus[_mealNames.default[mealName]] = (0, _getMenuItemList.default)(data.COLUMNS, filteredData);
      }

      return [menus];
    }
}