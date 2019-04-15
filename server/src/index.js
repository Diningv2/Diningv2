import express from "express";
import bodyParser from "body-parser";
import cron from "node-cron";

import LocationsRouter from "./routers/LocationsRouter/LocationsRouter";
import MenusRouter from "./routers/MenusRouter/MenusRouter";
import MenuItemsRouter from "./routers/MenuItemsRouter/MenuItemsRouter";
import FavoritesRouter from "./routers/FavoritesRouter/FavoritesRouter";
import TestPushRouter from "./routers/TestPushRouter/TestPushRouter";
import PopulateRouter from "./routers/PopulateRouter/PopulateRouter";

import sendNotifications from "./cron/notifications/sendNotifications";
import updateMenuItemNames from "./cron/cleanup/updateMenuItemNames";
import populateMenus from "./cron/caching/populateMenus";

const PORT = process.env.PORT || 5000;

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/api/locations", LocationsRouter);
server.use("/api/menus", MenusRouter);
server.use("/api/menuItems", MenuItemsRouter);
server.use("/api/favorites", FavoritesRouter);
server.use("/api/testPush", TestPushRouter);
server.use("/api/populate", PopulateRouter);

server.listen(PORT, e => e && console.error(e));

const options = {
    scheduled: true,
    timezone: "America/New_York"
};

// Run at 7:00 am every day
cron.schedule("0 7 * * *", () => sendNotifications(), options);

// Run clean up at 2:00 am every night
cron.schedule("0 2 * * *", () => updateMenuItemNames(), options);

// Run every hour at the 1 minute mark
cron.schedule("1 * * * *", () => populateMenus(), options);
