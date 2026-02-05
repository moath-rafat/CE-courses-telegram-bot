import express from "express";
import { getMessageFromTelegram } from "./controllers";

const router = express.Router();

router.post("/webhook", getMessageFromTelegram);

export default router;