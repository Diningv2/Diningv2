import express from "express";

import getFavorites from "./getFavorites";
import addFavorite from "./addFavorite";
import removeFavorite from "./removeFavorite";

const router = express.Router();

router
    .get("/", async (req, res) => {
        try {
            const favorites = await getFavorites(req.query.token);
            res.send(favorites).status(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    })
    .post("/", async (req, res) => {
        try {
            await addFavorite(req.body.token, req.body.menuitemid, req.body.name);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    })
    .post("/delete", async (req, res) => {
        try {
            await removeFavorite(req.body.token, req.body.menuitemid);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    });

export default router;
