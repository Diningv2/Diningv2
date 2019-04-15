import express from "express";

import populateMenus from "../../cron/caching/populateMenus";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        res.send("Populating Firestore...");
        await populateMenus();
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    }
});

export default router;
