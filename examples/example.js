if (!process.env.BOTMETRICS_BOT_ID) {
  console.log('Error: Specify BOTMETRICS_BOT_ID in your environment');
  process.exit(1);
}

if (!process.env.BOTMETRICS_API_KEY) {
  console.log('Error: Set BOTMETRICS_API_KEY in your environment');
  process.exit(1);
}

if (!process.env.KIK_USERNAME) {
  console.log('Error: Specify KIK_USERNAME in environment');
  process.exit(1);
}

if (!process.env.KIK_API_KEY) {
  console.log('Error: Specify KIK_API_KEY in environment');
  process.exit(1);
}

if (!process.env.KIK_WEBHOOK_HOST) {
  console.log('Error: Specify KIK_WEBHOOK_HOST in environment');
  process.exit(1);
}

'use strict';

let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');
let BotmetricsMiddleware = require('../index').BotmetricsMiddleware({
  botId: process.env.BOTMETRICS_BOT_ID,
  apiKey: process.env.BOTMETRICS_API_KEY,
  username: process.env.KIK_USERNAME
});

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: process.env.KIK_USERNAME,
    apiKey: process.env.KIK_API_KEY,
    baseUrl: process.env.KIK_WEBHOOK_HOST,
});

bot.use(BotmetricsMiddleware.receive);
bot.outgoing(BotmetricsMiddleware.send);

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
  message.reply("You said: " + message.body);
});

var port = (process.env.PORT || 3000);

console.log("listening for messages on port " + port);

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(port);
