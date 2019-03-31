"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getOneLocation;

var _getHours = _interopRequireDefault(require("./getHours"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getOneLocation(data, query) {
  const location = data.DATA.filter(entry => entry[data.COLUMNS.indexOf("ID_LOCATION")] == query.location);

  if (location.length) {
    const entry = location[0];
    var todayHours = {};
    var tomorrowHours = {};

    try {
      todayHours = await (0, _getHours.default)(query.location, 0);
      tomorrowHours = await (0, _getHours.default)(query.location, 1);
    } catch (e) {
      console.log("getHours Failed in LocationsRouter/getOneLocation.js");
    }

    return {
      name: entry[data.COLUMNS.indexOf("DININGLOCATIONNAME")],
      todayHours: todayHours,
      tomorrowHours: tomorrowHours,
      isOpen: parseFloat(entry[data.COLUMNS.indexOf("ISCLOSED")]) ? false : true,
      busyness: parseInt(entry[data.COLUMNS.indexOf("CAPACITY")]),
      geolocation: entry[data.COLUMNS.indexOf("GEOLOCATION")].split(",").map(v => parseFloat(v))
    };
  } else {
    throw new Error("Invalid location request");
  }
}