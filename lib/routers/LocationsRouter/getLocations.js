"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLocations;

var _axios = _interopRequireDefault(require("axios"));

var _processLocations = _interopRequireDefault(require("./processLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOCATIONS_URI = "http://www.yaledining.org/fasttrack/locations.cfm?version=3";

async function getLocations(query) {
  const response = await _axios.default.get(LOCATIONS_URI);
  const locations = await (0, _processLocations.default)(response.data, query);
  return locations;
}