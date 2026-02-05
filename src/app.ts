import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";

const app = express();

dotenv.config();
export const TOKEN = process.env.BOT_TOKEN;
export const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(8000);