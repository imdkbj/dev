//You need to manually set the webhook for this bot
//Format = https://api.telegram.org/bot<TOKEN>/setwebhook?url=<SERVER>?masterbot=bot<TOKEN>;
//TOKEN = 12345:DBFLKDJBFLJKFLKS
//SERVER = https://xyz.com:8443
//This will look like following...
//https://api.telegram.org/bot12345:DBFLKDJBFLJKFLKS/setwebhook?url=https://xyz.com:8443?masterbot=bot12345:DBFLKDJBFLJKFLKS;
//Once you make the url, Just copy paste this in browser and hit enter.
//Now run the runme.js
//check https://github.com/hnaderi/telegraf-session-mysql to create a table in database.

const Telegraf = require("telegraf");
const MySQLSession = require('telegraf-session-mysql')
const {
    myWebhookURL,
    sessionObj
} = require("./const");

const session = new MySQLSession(sessionObj);

module.exports.handleUpdate = (bot, token) => {
    bot.use(session.middleware());

    bot.start((ctx) => ctx.replyWithHTML(`Hello ${ctx.chat.first_name}\nSend bot token for bot setup.`))

    bot.hears(tokenRegex, async (ctx) => {
        let BOT_TOKEN = ctx.match[0];
        let webhookURL = myWebhookURL(BOT_TOKEN);
        await new Telegraf(BOT_TOKEN).telegram.setWebhook(webhookURL);
        return ctx.replyWithHTML('BOT setup done.\nChoose something...');
    })

    bot.on("message", (ctx) => ctx.replyWithHTML('U said ' + ctx.message.text))

    bot.catch((e) => console.error(e))

    bot.launch({
        webhook: {
            hookPath: myWebhookURL(token, 'masterbot')
        },
    });
}