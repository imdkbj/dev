const fs = require('fs');
const https = require('https');
const express = require('express');
var bodyParser = require('body-parser');
var app = express();
const Telegraf = require("telegraf");

//ssl details
//i have copied the cert details from the cpanel.
const sslPath = '../../ssl/';
const privateKey = fs.readFileSync(sslPath + 'mycert.key', 'utf8');
const certificate = fs.readFileSync(sslPath + 'mycert.crt', 'utf8');
const caCerts = [
    fs.readFileSync(sslPath + 'CA_root.crt'),
    fs.readFileSync(sslPath + 'ca_bundle_certificate.crt')
];

var credentials = {
    key: privateKey,
    cert: certificate,
    ca: caCerts
};

//port to listen
var port = process.env.PORT || 8443;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))

app.post('/', (req, res) => {
    //send response
    res.sendStatus(200);
    
    const query = req.originalUrl.split('=');
    //get bot token from the webhook
    const token = query[1].substring(3);
    //get webhook from
    const from = query[0].substring(2);
    //body of the message.	
    var msg = req.body;
    // console.log(msg);

    switch (from) {

        case ('allbots'):
            var bot = new Telegraf(token);
            require('./bots.js').handleUpdate(bot);
            bot.handleUpdate(msg);
            break;

        case ('masterbot'):
            var bot = new Telegraf(token);
            require('./masterbot.js').handleUpdate(bot);
            bot.handleUpdate(msg);
            break;

        case ('someother'):
            'Something else...'
            break;

        default:
            console.log('Webhook response from unknown source', msg);
    }
})

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(port, function () {
    console.log('Webhook server started on: ' + port)
});
