"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getMenus;

var _getMenu = _interopRequireDefault(require("./getMenu"));

var _mealNames = _interopRequireDefault(require("../../config/mealNames"));

var _monthName = _interopRequireDefault(require("../../config/monthName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getMenus(data, query) {
  // case: bad response from Yale Dining
  if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
    throw new Error('Empty object returned from YaleDining API');
  } // get date for menus --  relies on the fact that server is on EST/EDT


  const date = new Date();
  const today = _monthName.default[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear() + ' 00:00:00'; // meal query -- returns a list of MenuItem objects

  if ('meal' in query) {
    const filteredData = data.DATA.filter(entry => _mealNames.default[entry[data.COLUMNS.indexOf('MEALNAME')]] == query.meal && entry[data.COLUMNS.indexOf('MENUDATE')] == today);
    return (0, _getMenu.default)(data.COLUMNS, filteredData);
  } // location query -- returns a Menus object
  else {
      var menus = {};
      menus['location'] = data.DATA[0][data.COLUMNS.indexOf('LOCATION')];

      for (var mealName in _mealNames.default) {
        const filteredData = data.DATA.filter(entry => entry[data.COLUMNS.indexOf('MEALNAME')] === mealName && entry[data.COLUMNS.indexOf('MENUDATE')] === today);
        menus[_mealNames.default[mealName]] = (0, _getMenu.default)(data.COLUMNS, filteredData);
      }

      return menus;
    }
}