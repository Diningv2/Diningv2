import express from "express";

import getLocations from "./getLocations";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const location = await getLocations(req.query);
        res.send(location);
    } catch (e) {
        console.warn(e);
        if (e.message == "Invalid location request") {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
});

export default router;
