const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options.js')
const token = '6471615637:AAESN34CT1VJrPV3JQGwk5H38sXcKSCfKYM'

const bot = new TelegramApi(token, {polling: true})
 
const chats = {}

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, тебе нужно ее отгадать')
    const randomNumder = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumder;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
} 



 const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Получить имя пользователя'},
        {command: '/game', description: 'Игра'}
    
    ])
    
    bot.on( 'message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        
        if(text === '/start'){
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/r/rickmortypacks/rickmortypacks_012.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать!!!')
        }
       
        if(text === '/info'){
            return bot.sendMessage(chatId, `Тебя зовут  ${msg.from.first_name}`)
        }

        if(text === '/game'){
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю')
    })
    bot.on('callback_query',async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data === '/again'){
            return startGame(chatId);
        }
        if(data == chats[chatId]){
            
            return await bot.sendMessage(chatId, `Ты угадал!!! Я выбрал цифру  ${chats[chatId]}.`,againOptions);
        }
        else{
            bot.sendMessage(chatId, `Увы, ты не угадал, я загадал цифру ${chats[chatId]}.`, againOptions);
            
        }
        
    })
 }
    start ()