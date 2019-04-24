import express from "express";

import getPreferences from "./getPreferences";
import addPreference from "./addPreference";
import removePreference from "./removePreference";

const router = express.Router();

router
    .get("/", async (req, res) => {
        try {
            const { token } = req.query;
            const preferences = await getPreferences(token);
            res.send(preferences).status(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    })
    .post("/", async (req, res) => {
        try {
            const { token, preference } = req.body;
            await addPreference(token, preference);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    })
    .post("/delete", async (req, res) => {
        try {
            const { token, preference } = req.body;
            await removePreference(token, preference);
            res.sendStatus(200);
        } catch (e) {
            console.error(e);
            res.send(e).status(500);
        }
    });

export default router;
