import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron";

import LocationsRouter from "./routers/LocationsRouter/LocationsRouter";
import MenusRouter from "./routers/MenusRouter/MenusRouter";
import MenuItemsRouter from "./routers/MenuItemsRouter/MenuItemsRouter";
import FavoritesRouter from "./routers/FavoritesRouter/FavoritesRouter";

import sendNotifications from "./notifications/sendNotifications";

const PORT = process.env.PORT || 5000;

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/api/locations", LocationsRouter);
server.use("/api/menus", MenusRouter);
server.use("/api/menuItems", MenuItemsRouter);
server.use("/api/favorites", FavoritesRouter);

server.listen(PORT, e => e && console.error(e));

const options = {
    scheduled: true,
    timezone: "America/New_York"
};

// Run at 5:00 am every night (time subject to change)
cron.schedule("0 5 * * *", () => sendNotifications(), options);
