"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _locations = _interopRequireDefault(require("../config/locations"));

var _mealNames = _interopRequireDefault(require("../config/mealNames"));

var _monthName = _interopRequireDefault(require("../config/monthName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOCATIONS_URI = 'http://www.yaledining.org/fasttrack/menus.cfm?version=3';

const router = _express.default.Router();

var _default = router;
exports.default = _default;