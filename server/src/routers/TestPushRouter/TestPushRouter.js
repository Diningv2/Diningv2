import express from "express";

import sendNotifications from "../../cron/notifications/sendNotifications";

import { E_BAD_MENU_REQ } from "../../config/constants";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        sendNotifications();
        res.send("Sending push notifications...");
    } catch (e) {
        console.error(e);
        if (e.message == E_BAD_MENU_REQ) {
            res.sendStatus(400);
        } else {
            res.sendStatus(500);
        }
    }
});

export default router;
