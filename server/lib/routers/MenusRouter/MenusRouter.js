"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getOneMenu = _interopRequireDefault(require("./getOneMenu"));

var _getAllMenus = _interopRequireDefault(require("./getAllMenus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

var _default = router;
exports.default = _default;
router.get('/', async (req, res) => {
  if (!('location' in req.query) || req.query.location == 'all') {
    try {
      const menus = await (0, _getAllMenus.default)(req.query);
      res.send(menus);
    } catch (e) {
      console.warn(e);
      res.sendStatus(500);
    }
  } else {
    try {
      const menu = await (0, _getOneMenu.default)(req.query);
      res.send(menu);
    } catch (e) {
      console.warn(e);
      res.sendStatus(500);
    }
  }
});