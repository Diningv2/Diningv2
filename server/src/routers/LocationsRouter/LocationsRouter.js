import express from "express";

import getLocations from "./getLocations";

import { E_BAD_LOC_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const location = await getLocations(req.query);
        res.send(location);
    } catch (e) {
        console.error(e);
        if (e.message == E_BAD_LOC_REQ) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
});

export default router;
