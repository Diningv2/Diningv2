import express from "express";

import populateMenus from "../../cron/caching/populateMenus";
import cleanMenus from "../../cron/caching/cleanMenus";

const router = express.Router();

router
    .get("/", async (req, res) => {
        try {
            res.send("Populating Firestore...");
            await populateMenus();
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
