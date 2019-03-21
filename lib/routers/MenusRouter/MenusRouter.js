"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getMenus = _interopRequireDefault(require("./getMenus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  try {
    const menus = await (0, _getMenus.default)(req.query);
    res.send(menus);
  } catch (e) {
    console.warn(e);

    if (e.message == "Invalid menu request") {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  }
});
var _default = router;
exports.default = _default;