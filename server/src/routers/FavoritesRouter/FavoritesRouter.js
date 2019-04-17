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
            res.send(e.message).status(500);
        }
    })
    .post("/", async (req, res) => {
        try {
            const { token, menuitemid, name } = req.body;
            await addFavorite(token, menuitemid, name);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e.message).status(500);
        }
    })
    .post("/delete", async (req, res) => {
        try {
            const { token, menuitemid } = req.body;
            await removeFavorite(token, menuitemid);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e.message).status(500);
        }
    });

export default router;
