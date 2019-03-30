"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _getLocations = _interopRequireDefault(require("./getLocations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/", async (req, res) => {
  try {
    const location = await (0, _getLocations.default)(req.query);
    res.send(location);
  } catch (e) {
    console.warn(e);

    if (e.message == "Invalid location request") {
      res.sendStatus(400);
    } else {
      res.sendStatus(500);
    }
  }
});
var _default = router;
exports.default = _default;