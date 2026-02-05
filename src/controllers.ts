import { Request, Response } from "express";
import axios from "axios";
import { TELEGRAM_API } from "./app";
import { categories, common, hardware, labs, network, software, subjectsInfo } from "./data";

export async function getMessageFromTelegram(req: Request, res: Response) {
    if(!req.body.message && !req.body.callback_query) return res.sendStatus(200);

    if(req.body.message) {
        const message = req.body.message;
        const chatID: number | null = message.chat.id;  
        const text: string = message.text;
        
        if(!chatID || !text) {
            return res.sendStatus(200);
        }
        
        if(text === "/start" || text === "Back") {
            console.log("start or back");
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
               chat_id: chatID,
               text,
               reply_markup: {
                    keyboard: categories,
                    resize_keyboard: true,
                    one_time_keyboard: false
               } 
            });            
        }

        else if(text === "Hardware") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text,
                reply_markup: {
                    keyboard: hardware,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        } 

        else if(text === "Software") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text,
                reply_markup: {
                    keyboard: software,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }

        else if(text === "Network") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text,
                reply_markup: {
                    keyboard: network,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }

        else if(text === "Common Subjects") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text,
                reply_markup: {
                    keyboard: common,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });
        }

        else if(text === "Labs") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text,
                reply_markup: {
                    keyboard: labs,
                    resize_keyboard: true,
                    one_time_keyboard: false
                }
            });

        }

        else if(subjectsInfo[text]) {
            const subjectText = subjectsInfo[text];  

            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text: subjectText
            });
        }
    }

    return res.sendStatus(200);
    
}