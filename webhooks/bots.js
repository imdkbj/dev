module.exports.handleUpdate = (bot) => {
    bot.hears('hi', ({
        reply
    }) => reply('Hello'));

    bot.on('text', (ctx) => ctx.reply(ctx.message.text));

    bot.catch((e) => console.error(e))

}