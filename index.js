const { default: axios } = require("axios");
const { Telegraf } = require("telegraf");
require("dotenv").config();
const cryptoToken = process.env.CRYPTO_TOKEN;
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
    ctx.sendChatAction("typing");
    bot.telegram.sendMessage(ctx.chat.id, "منوی اصلی", {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "قیمت رمز ارزها", callback_data: "pricing"}
                ],
                [
                    {text: "CoinList(CryptoCompare)", url: "https://www.cryptocompare.com/ "}
                ]                
            ]
        }
    })
});
bot.action("pricing", ctx => {
    // ctx.answerCbQuery();  
    ctx.deleteMessage();  
    bot.telegram.sendMessage(ctx.chat.id, "لطفا یکی از ازر های دیجیتال زیر را انتخاب کنید", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "BTC", callback_data: "BTC"},
                    {text: "ETH", callback_data: "ETH"}
                ],
                [
                    {text: "USDT", callback_data: "USDT"},
                    {text: "XRP", callback_data: "XRP"}
                ],
                [
                    {text: "منوی اصلی", callback_data: "mainmenu"}
                ]       
            ]
        }
    })
});
bot.action(["BTC", "ETH", "USDT", "XRP"], async ctx => {
    try {
        const ApiUrl=`https://min-api.cryptocompare.com/data/price?fsym=${ctx.match}&tsyms=USD&${cryptoToken}`;
        const data = await axios.get(ApiUrl).then(res => res.data);
        ctx.reply(`${Object.keys(data)[0]}: ${Object.values(data)[0]}`);
    } catch (error) {
        ctx.reply(error.message)
    }
})
// main menu action 
bot.action("mainmenu", ctx => {
    // ctx.answerCbQuery();  
    ctx.deleteMessage(); 
    bot.telegram.sendMessage(ctx.chat.id, "منوی اصلی", {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "قیمت رمز ارزها", callback_data: "pricing"}
                ],
                [
                    {text: "CoinList(CryptoCompare)", url: "https://www.cryptocompare.com/ "}
                ]                
            ]
        }
    })
});

bot.launch();