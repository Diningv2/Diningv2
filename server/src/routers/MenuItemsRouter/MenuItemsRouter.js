import express from "express";
import getMenuIdInfo from "./getMenuIdInfo";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
    if (!("menuitemid" in req.query)) {
        console.error("menuitemid is an essential parameter");
        res.sendStatus(400);
    } else {
        try {
            const menu = await getMenuIdInfo(req.query.menuitemid);
            res.send(menu).status(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    }
});
