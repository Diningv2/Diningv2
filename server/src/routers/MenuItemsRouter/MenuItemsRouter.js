import express from "express";
import getMenuIdInfo from "./getMenuIdInfo";
import { E_BAD_MENU_ITEM_REQ } from "../../config/constants";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
    try {
        const menu = await getMenuIdInfo(req.query.menuitemid);
        res.send(menu).status(200);
    } catch (e) {
        console.error(e);
        if (e.message == E_BAD_MENU_ITEM_REQ) {
            res.send(e).status(400);
        } else {
            res.send(e).status(500);
        }
    }
});
