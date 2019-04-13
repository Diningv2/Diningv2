import express from "express";

import populateMenus from "../../cron/caching/populateMenus";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        populateMenus();
        res.send("Populating Firestore...");
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

export default router;
