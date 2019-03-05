"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenu = getMenu;
exports.getMenus = getMenus;
exports.getOneMenu = getOneMenu;
exports.getAllMenus = getAllMenus;
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _axios = _interopRequireDefault(require("axios"));

var _locations = _interopRequireDefault(require("../config/locations"));

var _mealNames = _interopRequireDefault(require("../config/mealNames"));

var _monthName = _interopRequireDefault(require("../config/monthName"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MENUS_URI = 'http://www.yaledining.org/fasttrack/menus.cfm?version=3';

const router = _express.default.Router();

var _default = router;
exports.default = _default;
router.get('/', async (req, res) => {
  if (!('location' in req.query) || req.query.location == 'all') {
    try {
      const menus = await getAllMenus(req.query);
      res.send(menus);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  } else {
    try {
      const menu = await getOneMenu(req.query);
      res.send(menu);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  }
});

function getMenu(columns, data) {
  // map API response to new format
  const menu = data.map(entry => {
    if (!entry || !entry.length) return null;
    var menuItem = {};
    menuItem['name'] = entry[columns.indexOf('MENUITEM')];
    menuItem['itemID'] = entry[columns.indexOf('MENUITEMID')];
    return menuItem;
  }); // filter out null and duplicate entries

  const filteredMenu = menu.filter(entry => entry != null).filter((entry, index, self) => self.findIndex(otherEntry => otherEntry.name === entry.name && otherEntry.itemID === entry.itemID) === index);
  return filteredMenu.length ? filteredMenu : null;
}

function getMenus(data, query) {
  // case: bad response from Yale Dining
  if (!data || !data.DATA || !data.DATA.length || !data.DATA[0].length) {
    throw new Error('Empty object returned from YaleDining API');
  } // get date for menus --  relies on the fact that server is on EST/EDT


  const date = new Date();
  const today = _monthName.default[date.getMonth()] + ', ' + date.getDate() + ' ' + date.getFullYear() + ' 00:00:00'; // meal query -- returns a list of MenuItem objects

  if ('meal' in query) {
    const filteredData = data.DATA.filter(entry => _mealNames.default[entry[data.COLUMNS.indexOf('MEALNAME')]] == query.meal && entry[data.COLUMNS.indexOf('MENUDATE')] == today);
    return getMenu(data.COLUMNS, filteredData);
  } // location query -- returns a Menus object
  else {
      var menus = {};
      menus['location'] = data.DATA[0][data.COLUMNS.indexOf('LOCATION')];

      for (var mealName in _mealNames.default) {
        const filteredData = data.DATA.filter(entry => entry[data.COLUMNS.indexOf('MEALNAME')] === mealName && entry[data.COLUMNS.indexOf('MENUDATE')] === today);
        menus[_mealNames.default[mealName]] = getMenu(data.COLUMNS, filteredData);
      }

      return menus;
    }
}

async function getOneMenu(query) {
  const endpoint = MENUS_URI + '&location=' + query.location;

  try {
    const response = await _axios.default.get(endpoint);
    const menu = getMenus(response.data, query);
    return menu;
  } catch (e) {
    throw new Error('Empty object returned for: ' + _locations.default[query.location]);
  }
}

async function getAllMenus(query) {
  var allMenus = [];
  var maxErrors = Object.keys(_locations.default).length;
  var nErrors = 0;

  for (var location in _locations.default) {
    try {
      query.location = location;
      const menu = await getOneMenu(query);
      allMenus.push(menu);
    } catch (e) {
      nErrors++;

      if (nErrors >= maxErrors) {
        throw new Error('Empty object returned for all locations');
      } else {
        console.warn(e.message + ' (total: ' + nErrors + ')');
      }
    }
  }

  if ('meal' in query) return allMenus.reduce((first, second) => first.concat(second)).filter((entry, index, self) => self.findIndex(otherEntry => otherEntry.name === entry.name && otherEntry.itemID === entry.itemID) === index);else return allMenus;
}