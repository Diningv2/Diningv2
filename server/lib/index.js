"use strict";

var _express = _interopRequireDefault(require("express"));

var _LocationsRouter = _interopRequireDefault(require("./routers/LocationsRouter"));

var _MenusRouter = _interopRequireDefault(require("./routers/MenusRouter/MenusRouter"));

var _MenuItemsRouter = _interopRequireDefault(require("./routers/MenuItemsRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const server = (0, _express.default)();
const PORT = process.env.PORT || 5000;
server.use('/api/locations', _LocationsRouter.default);
server.use('/api/menus', _MenusRouter.default);
server.use('/api/menuItems', _MenuItemsRouter.default);
server.listen(PORT, error => {
  if (error) {
    console.log(error);
  }

  ;
});