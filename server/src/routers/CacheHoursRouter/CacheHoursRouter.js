import express from "express";

import cacheHours from "../../cron/caching/Hours/cacheHours";

import { E_BAD_MENU_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cachedHoursToday = await cacheHours();
        res.send("Caching today's dhall hours...").status(200);
    } catch (e) {
        console.error(e);
        res.send(e).status(500);
    }
});

export default router;