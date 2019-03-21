"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getHours;

var _axios = _interopRequireDefault(require("axios"));

var _mealNames = _interopRequireDefault(require("../../config/mealNames"));

var _monthName = _interopRequireDefault(require("../../config/monthName"));

var _locations = _interopRequireDefault(require("../../config/locations"));

var _diningHallHours = _interopRequireDefault(require("../../config/diningHallHours"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MENUS_URI = "http://www.yaledining.org/fasttrack/menus.cfm?version=3";

async function getHours(location, offset) {
  const endpoint = MENUS_URI + "&location=" + location;
  const response = await _axios.default.get(endpoint);
  const data = response.data; // throw on bad response from Yale Dining

  if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
    throw new Error("Empty object returned from YaleDining API");
  } // get date for menus -- relies on the fact that server is on EST/EDT


  const currentDate = new Date();
  const date = _monthName.default[currentDate.getMonth()] + ", " + (currentDate.getDate() + offset) + " " + currentDate.getFullYear() + " 00:00:00";
  const dateFilteredData = data.DATA.filter(entry => entry[data.COLUMNS.indexOf("MENUDATE")] === date);
  var locationHours = {};

  for (let mealName in _mealNames.default) {
    const mealFilteredData = dateFilteredData.filter(entry => entry[data.COLUMNS.indexOf("MEALNAME")] === mealName);
    locationHours[_mealNames.default[mealName]] = mealFilteredData.length ? {
      // all items have the same opening/closing time
      openingTime: mealFilteredData[0][data.COLUMNS.indexOf("MEALOPENS")],
      closingTime: mealFilteredData[0][data.COLUMNS.indexOf("MEALCLOSES")],
      transferTime: undefined // TODO: Hardcode in transfer times in ../../config/DiningHallHours
      // diningHallHours[locations[location]][mealNames[mealName]].transferTime

    } : undefined;
  }

  return locationHours;
}