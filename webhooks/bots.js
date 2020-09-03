module.exports.handleUpdate = (bot,token) => {
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
