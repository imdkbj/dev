//You need to manually set the webhook for this bot
//Format = https://api.telegram.org/bot<TOKEN>/setwebhook?url=<SERVER>?masterbot=bot<TOKEN>;
//TOKEN = 12345:DBFLKDJBFLJKFLKS
//SERVER = https://xyz.com:8443
//This will look like following...
//https://api.telegram.org/bot12345:DBFLKDJBFLJKFLKS/setwebhook?url=https://xyz.com:8443?masterbot=bot12345:DBFLKDJBFLJKFLKS;
//Once you make the url, Just copy paste this in browesr and hit enter.
//Now run the runme.js
//check https://github.com/hnaderi/telegraf-session-mysql to create a table in databse.


const tokenRegex = /^[0-9]{6,10}:[a-zA-Z0-9_-]{35}$/gm;
const mydomain = 'https://domain.com:8443';
const serveraddress = mydomain + 'allbots';

const Telegraf = require("telegraf");  
const MySQLSession = require('telegraf-session-mysql')

const session = new MySQLSession({
  host: 'localhost',
  user: 'user',
  password: 'pass',
  database: 'telegraf_sessions',
  getSessionKey: (ctx) => `${ctx.chat.id}:${ctx.tg.token.split(":")[0]}`
})

module.exports.handleUpdate = (bot) => {
    bot.use(session.middleware());
    
    bot.start((ctx) => ctx.replyWithHTML(`Hello ${ctx.chat.first_name}\nSend bot token for bot setup.`))

    bot.hears(tokenRegex, async (ctx) => {
        const BOT_TOKEN = ctx.match[0];
        await new Telegraf(BOT_TOKEN).telegram.setWebhook(`${serveraddress}=bot${BOT_TOKEN}`);
        return ctx.replyWithHTML('BOT setup setup done.\nChoose something...');
    })

    bot.on("message", (ctx) => ctx.replyWithHTML('U said ' + ctx.message.text))

    bot.catch((e) => console.error(e))
    
    bot.launch({
        webhook: {
            hookPath: `${mydomain}masterbot=bot${master_bot_token}`,
        },
    });

}
