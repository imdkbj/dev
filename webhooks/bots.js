const MySQLSession = require('telegraf-session-mysql')

const session = new MySQLSession(Object.assign(MEMBER_DB, {
    getSessionKey: (ctx) => `${ctx.chat.id}:${ctx.tg.token.split(":")[0]}`
}));

module.exports.handleUpdate = (bot,token) => {
    bot.use(session.middleware());
    
    bot.hears('hi', ({
        reply
    }) => reply('Hello'));

    bot.on('text', (ctx) => ctx.reply(ctx.message.text));

    bot.catch((e) => console.error(e))
    
    bot.launch({
        webhook: {
            hookPath: `${mydomain}allbots=bot${token}`,
        },
    });
    
}
