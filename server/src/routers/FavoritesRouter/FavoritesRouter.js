import express from "express";

import addFavorite from "./addFavorite";
import removeFavorite from "./removeFavorite";

const router = express.Router();

router
    .post("/", async (req, res) => {
        try {
            await addFavorite(req.body.token, req.body.menuitemid);
            res.sendStatus(200);
        } catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    })
    .post("/delete", async (req, res) => {
        try {
            await removeFavorite(req.body.token, req.body.menuitemid);
            res.sendStatus(200);
        } catch (e) {
            console.warn(e);
            res.sendStatus(500);
        }
    });

export default router;
