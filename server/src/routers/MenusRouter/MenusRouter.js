import express from "express";

import getMenus from "./getMenus";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const menus = await getMenus(req.query);
        res.send(menus);
    } catch (e) {
        console.error(e);
        if (e.message == "Invalid menu request") {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
});

export default router;
