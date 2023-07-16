const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const cryptoToken = process.env.CRYPTO_TOKEN;
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command("crypto", (ctx) => {
    ctx.sendChatAction("typing");
    ctx.telegram.sendMessage(ctx.chat.id, "لطفا یکی از ازر های دیجیتال زیر را انتخاب کنید", {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "one", callback_data: "one"},
                    {text: "two", callback_data: "two"}
                ],
                [
                    {text: "three", callback_data: "three"},
                    {text: "four", callback_data: "four"}
                ],
                [
                    {text: "five", callback_data: "five"}
                ]
            ]
        }
    })
});
bot.action("one", ctx => {
    ctx.answerCbQuery();    ctx.reply("you clicked on one!!");
});
bot.action("two", ctx => {
    ctx.answerCbQuery();
    ctx.reply("You Clicked On Two!!");
});
bot.action("three", ctx => {
    ctx.reply("You Clicked On Three!!");
});
bot.action("four", ctx => {
    ctx.answerCbQuery();
    ctx.reply("You Clicked On Four!!");
});
bot.action("five", ctx => {
    ctx.answerCbQuery();
    ctx.reply("You Clicked On Five!!");
});


bot.launch();