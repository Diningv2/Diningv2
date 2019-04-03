import express from "express";
import bodyParser from "body-parser";

import LocationsRouter from "./routers/LocationsRouter/LocationsRouter";
import MenusRouter from "./routers/MenusRouter/MenusRouter";
import MenuItemsRouter from "./routers/MenuItemsRouter/MenuItemsRouter";
import FavoritesRouter from "./routers/FavoritesRouter/FavoritesRouter";

const PORT = process.env.PORT || 5000;

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/api/locations", LocationsRouter);
server.use("/api/menus", MenusRouter);
server.use("/api/menuItems", MenuItemsRouter);
server.use("/api/favorites", FavoritesRouter);

server.listen(PORT, error => {
    if (error) {
        console.log(error);
    }
});
