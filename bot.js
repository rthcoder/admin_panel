// import { Telegraf } from "telegraf";

// const bot = new Telegraf("6808889348:AAHAylUTfYzfCIupnVvsy42w_yE0Nx0x7WA");




// async function sendLidToBot(message) {

//     try {

//         const updates = await bot.getUpdates();

//         bot.u

//         bot.telegram.sendMessage(CHANEL_ID, message);
//         bot.launch();
//         bot.stop()

//     } catch (error) {
//         return error.message
//     }

// }


import TelegramBot from 'node-telegram-bot-api'

// Replace with your actual bot token
const token = '6808889348:AAHAylUTfYzfCIupnVvsy42w_yE0Nx0x7WA';

const bot = new TelegramBot(token);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    // Log the chat ID of every incoming message
    console.log(chatId);
});