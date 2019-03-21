"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getMenuIdInfo = _interopRequireDefault(require("./getMenuIdInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

var _default = router;
exports.default = _default;
router.get('/', async (req, res) => {
  if (!('menuitemid' in req.query)) {
    console.warn("menuitemid is an essential parameter");
    res.sendStatus(400);
  } else {
    try {
      const menu = await (0, _getMenuIdInfo.default)(req.query.menuitemid);
      res.send(menu);
    } catch (e) {
      console.warn(e);
      res.sendStatus(500);
    }
  }
});