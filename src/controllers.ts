import { Request, Response } from "express";
import axios from "axios";
import { TELEGRAM_API } from "./app";
import { categories, common, hardware, labs, network, software, subjectsInfo } from "./data";

export async function getMessageFromTelegram(req: Request, res: Response) {
    res.sendStatus(200);

    if(!req.body.message && !req.body.callback_query) return;

    if(req.body.message) {
        const message = req.body.message;
        const chatID: number | null = message.chat.id;  
        const text: string = message.text;
        
        if(!chatID || !text) {
            return;
        }
        
        if(text === "/start" || text === "Back") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                   chat_id: chatID,
                   text,
                   reply_markup: {
                        keyboard: categories,
                        resize_keyboard: true,
                        one_time_keyboard: false
                   } 
                });            
            } catch(err) {
                return;
            }
        }

        else if(text === "Hardware") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text,
                    reply_markup: {
                        keyboard: hardware,
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            } catch(err) {
                return;
            }
        } 

        else if(text === "Software") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text,
                    reply_markup: {
                        keyboard: software,
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            } catch(err) {
                return;
            }
        }

        else if(text === "Networks") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text,
                    reply_markup: {
                        keyboard: network,
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            } catch(err) {
                return;
            }
        }

        else if(text === "Common Subjects") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text,
                    reply_markup: {
                        keyboard: common,
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            } catch(err) {
                return;
            }
        }

        else if(text === "Labs") {
            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text,
                    reply_markup: {
                        keyboard: labs,
                        resize_keyboard: true,
                        one_time_keyboard: false
                    }
                });
            } catch(err) {
                return;
            }

        }

        else if(subjectsInfo[text]) {
            const subjectText = subjectsInfo[text];  

            try {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: subjectText
                });
            } catch(err) {
                return;
            }
        }
    }
    
}