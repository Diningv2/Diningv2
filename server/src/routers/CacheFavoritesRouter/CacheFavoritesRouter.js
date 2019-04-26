import express from "express";

import cacheFavorites from "../../cron/caching/Favorites/cacheFavorites";

import { E_BAD_MENU_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const cachedFavoritesToday = await cacheFavorites();
        res.send("Caching today's menuitems...").status(200);
    } catch (e) {
        console.error(e);
        res.send(e).status(500);
    }
});

export default router;