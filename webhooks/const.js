exports.tokenRegex = /^[0-9]{9}:[a-zA-Z0-9_-]{35}$/gm;
exports.mydomain = `https://domain.com:8443?`;
exports.allbots = 'allbots';


exports.myWebhookURL = (token, query = allbots) => `${mydomain}${query}=bot${token}`;

exports.sessionObj = (ctx) => {
    let obj = {
        host: 'localhost',
        user: 'user',
        password: 'pass',
        database: 'telegraf_sessions',
        getSessionKey: (ctx) => `${ctx.chat.id}:${ctx.tg.token.split(":")[0]}`
    }
    return obj;
}