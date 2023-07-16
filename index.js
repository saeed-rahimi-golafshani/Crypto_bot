const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch();