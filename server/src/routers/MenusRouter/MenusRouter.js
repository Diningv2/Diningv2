import express from "express";

import getMenus from "./getMenus";

import { E_BAD_MENU_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const menus = await getMenus(req.query);
        res.send(menus).status(200);
    } catch (e) {
        console.error(e);
        if (e.message == E_BAD_MENU_REQ) {
            res.send(e.message).status(400);
        } else {
            res.send(e.message).status(500);
        }
    }
});

export default router;
