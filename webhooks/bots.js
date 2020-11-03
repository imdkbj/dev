//check https://github.com/hnaderi/telegraf-session-mysql to create a table in database.

const MySQLSession = require('telegraf-session-mysql')
const {
    myWebhookURL,
    sessionObj
} = require("./const");

const session = new MySQLSession(sessionObj);

module.exports.handleUpdate = (bot, token) => {
    bot.use(session.middleware());

    bot.hears('hi', ({
        reply
    }) => reply('Hello'));

    bot.on('text', (ctx) => ctx.reply(ctx.message.text));

    bot.catch((e) => console.error(e))

    bot.launch({
        webhook: {
            hookPath: myWebhookURL(token)
        },
    });
}