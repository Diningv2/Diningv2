import express from "express";

import getMenus from "./getMenus";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const menus = await getMenus(req.query);
        res.send(menus);
    } catch (e) {
        if (e.message == "Empty object returned from YaleDining API") {
            console.warn(e);
            res.sendStatus(424);
        } else if (e.message == "Invalid menu request") {
            console.warn(e);
            res.sendStatus(400);
        } else {
            console.warn(e);
            res.sendStatus(500);
        }
    }
});

export default router;
