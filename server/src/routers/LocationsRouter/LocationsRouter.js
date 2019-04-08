import express from "express";

import getLocations from "./getLocations";

import { E_BAD_LOC_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const location = await getLocations(req.query);
        res.send(location).status(200);
    } catch (e) {
        console.error(e);
        if (e.message == E_BAD_LOC_REQ) {
            res.send(e).status(400);
        } else {
            res.send(e).status(500);
        }
    }
});

export default router;
