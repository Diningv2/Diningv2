"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = processLocations;

var _locations = _interopRequireDefault(require("../../config/locations"));

var _getOneLocation = _interopRequireDefault(require("./getOneLocation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function processLocations(data, query) {
  // throw on bad response from Yale Dining
  if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
    throw new Error("Empty object returned from YaleDining API");
  }

  if ("location" in query) {
    return await (0, _getOneLocation.default)(data, query);
  } else {
    var allLocations = {};
    const maxErrors = Object.keys(_locations.default).length;
    var nErrors = 0;

    for (let location in _locations.default) {
      try {
        query["location"] = location;
        allLocations[_locations.default[location]] = await (0, _getOneLocation.default)(data, query);
      } catch (e) {
        nErrors++;
        console.warn(e.message + " for: " + _locations.default[location] + " (total: " + nErrors + ")");

        if (nErrors >= maxErrors) {
          throw new Error("Empty object returned from YaleDining API");
        }
      }
    }

    return allLocations;
  }
}