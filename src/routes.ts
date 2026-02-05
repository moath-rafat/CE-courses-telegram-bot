import express from "express";
import { getMessageFromTelegram } from "./controllers";

const router = express.Router();

router.post("/webhook", getMessageFromTelegram);

router.get("/health", (req, res) => {
    res.status(200).send("Bot is alive");
});

export default router;