const CHANEL_ID = "7034242560";
const CHANEL_ID2 = "-1002194786768";

import TelegramBot from 'node-telegram-bot-api'

// replace the value below with the Telegram token you receive from @BotFather
const token = '6808889348:AAHAylUTfYzfCIupnVvsy42w_yE0Nx0x7WA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token);

async function sendLidToBot(message) {

    try {

        bot.sendMessage(CHANEL_ID, message)
        bot.sendMessage(CHANEL_ID2, message)

    } catch (error) {
        return error.message
    }

}


export default {
    sendLidToBot
}
