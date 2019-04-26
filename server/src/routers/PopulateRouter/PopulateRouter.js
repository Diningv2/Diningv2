import express from "express";

import populateMenus from "../../cron/caching/Menus/populateMenus";
import cleanMenus from "../../cron/caching/Menus/cleanMenus";
import populateMenuItems from "../../cron/caching/MenuItems/populateMenuItems";

const router = express.Router();

router
    .get("/", async (req, res) => {
        try {
            res.send("Populating Firestore...");
            console.log("Populating Firestore...");
            await populateMenus();
            await populateMenuItems();
            console.log("Finished populating Firestore.");
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    })
    .get("/clean", async (req, res) => {
        try {
            res.send("Cleaning Firestore...");
            await cleanMenus();
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });

export default router;
