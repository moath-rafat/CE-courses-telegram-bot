import { Request, Response } from "express";
import axios from "axios";
import { TELEGRAM_API } from "./app";
import { subjectsInfo } from "./data";

const categories = [
    [{ text: "Hardware", callback_data: "CAT_HW" }],
    [{ text: "Software", callback_data: "CAT_SW" }],
    [{ text: "Network", callback_data: "CAT_NETWORK" }],
    [{ text: "Common Subjects", callback_data: "CAT_COMM" }],
    [{ text: "Labs", callback_data: "CAT_LABS" }] 
];

export async function getMessageFromTelegram(req: Request, res: Response) {
    if(!req.body.message && !req.body.callback_query) return res.sendStatus(200);

    let chatID: number | null = null;

    if(req.body.message) {
        const message = req.body.message;
        chatID = message.chat.id;  
        
        if(!chatID) {
            return res.sendStatus(200);
        }
        
        if(message.text === "/start") {
            console.log("start")
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
               chat_id: chatID,
               text: "Choose a category:",
               reply_markup: {
                    inline_keyboard: categories
               } 
            });            
        }
    }
    
    else if(req.body.callback_query) {
        const cb = req.body.callback_query;
        chatID = cb.message.chat.id

        res.sendStatus(200);

        if(cb.data === "Back") {
            await axios.post(`${TELEGRAM_API}/sendMessage`, {
               chat_id: chatID,
               text: "Choose a category:",
               reply_markup: {
                    inline_keyboard: categories
               } 
            }); 
        }
        
        else if(cb.data.startsWith("CAT_")) {
            console.log("Callback data:", cb.data);

            if(cb.data.endsWith("HW")) {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: "Choose a subject:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Circuit", callback_data: "SUB_Circuit" }],
                            [{ text: "Machines", callback_data: "SUB_Machine" }],
                            [{ text: "Organization 1", callback_data: "SUB_Organization1" }],
                            [{ text: "Embedded Systems", callback_data: "SUB_Embedded" }],
                            [{ text: "Organization 2", callback_data: "SUB_Organization2" }],
                            [{ text: "Digital Electronics(VLSI)", callback_data: "SUB_VLSI" }],
                            [{ text: "Parallel", callback_data: "SUB_Parallel" }],
                            [{ text: "Control Systems", callback_data: "SUB_Control" }],
                            [{ text: "<--Back", callback_data: "Back" }]
                        ]
                    }
                });
            } 

            else if(cb.data.endsWith("SW")) {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: "Choose a subject:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Java", callback_data: "SUB_Java" }],
                            [{ text: "Data Structures", callback_data: "SUB_Data" }],
                            [{ text: "AI & ML", callback_data: "SUB_AI" }],
                            [{ text: "Operating Systems", callback_data: "SUB_OS" }],
                            [{ text: "Network Protocols", callback_data: "SUB_NP" }],
                            [{ text: "<--Back", callback_data: "Back" }]
                        ]
                    }
                });
            }

            else if(cb.data.endsWith("NETWORK")) {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: "Choose a subject:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Network", callback_data: "SUB_Network" }],
                            [{ text: "Security", callback_data: "SUB_Security" }],
                            [{ text: "Communication", callback_data: "SUB_Communication" }],
                            [{ text: "<--Back", callback_data: "Back" }]
                        ]
                    }
                });
            }

            else if(cb.data.endsWith("COMM")) {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: "Choose a subject:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Digital Logic", callback_data: "SUB_Logic" }],
                            [{ text: "Electronics 1", callback_data: "SUB_Electronics" }],
                            [{ text: "Signals", callback_data: "SUB_Signals" }],
                            [{ text: "<--Back", callback_data: "Back" }]
                        ]
                    }
                });
            }

            else if(cb.data.endsWith("LABS")) {
                await axios.post(`${TELEGRAM_API}/sendMessage`, {
                    chat_id: chatID,
                    text: "Choose a subject:",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "Logic Lab", callback_data: "SUB_Logic_lab" }],
                            [{ text: "Python", callback_data: "SUB_Python_lab" }],
                            [{ text: "Circuit Lab", callback_data: "SUB_Circuit_lab" }],
                            [{ text: "Networks Lab", callback_data: "SUB_Networks_lab" }],
                            [{ text: "Embedded Systems Lab", callback_data: "SUB_Embedded_lab" }],
                            [{ text: "Technical Writing", callback_data: "SUB_Technical_Writing" }],
                            [{ text: "Digital Electronics Lab", callback_data: "SUB_Digital_lab" }],
                            [{ text: "Design Lab", callback_data: "SUB_Design_lab" }],
                            [{ text: "Numerical Lab(MATLAB)", callback_data: "SUB_Matlab" }],
                            [{ text: "Parallel Lab", callback_data: "SUB_Parallel_lab" }],
                            [{ text: "Advanced Networks Lab", callback_data: "SUB_Advanced_Networks_lab" }],
                            [{ text: "<--Back", callback_data: "Back" }]
                        ]
                    }
                });

            }
        }

        else if(cb.data.startsWith("SUB_")) {
            if(!chatID) {
                return res.sendStatus(200);
            }

            const subjectText = subjectsInfo[cb.data];
            if (!subjectText) return res.sendStatus(200);   

            await axios.post(`${TELEGRAM_API}/sendMessage`, {
                chat_id: chatID,
                text: subjectText
            });
        }
    }
}