const TeleBot = require('node-telegram-bot-api');
const TOKEN = '1125657385:AAHWaU_BmhayrIpArJtLJdiNjdK9tvtrHEc';

const bot = new TeleBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    if(msg.text){
        bot.sendMessage(chatId, `echo: ${msg.text}`);
    }
    else{
        bot.sendMessage(chatId, `Send a text message`);
    }
});