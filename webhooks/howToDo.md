# Setup Webhook for masterBOT.

You need to manually set the webhook for this bot.
Format = https://api.telegram.org/bot<TOKEN>/setwebhook?url=<SERVER>?masterbot=bot<TOKEN>

TOKEN = 12345:DBFLKDJBFLJKFLKS

SERVER = https://xyz.com:8443

This will look like following...

https://api.telegram.org/bot12345:DBFLKDJBFLJKFLKS/setwebhook?url=https://xyz.com:8443?masterbot=bot12345:DBFLKDJBFLJKFLKS

Once you make the url, Just copy paste this in browesr and hit enter.

# Now run the runme.js

Go to maser bot and it will ask you to send token for any additional public bots u want to setup.

All rest bots will follow the same code logic which is inside the bot.js file.
