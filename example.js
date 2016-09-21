require('dotenv').config();

if (!process.env.botId) {
  console.log('Error: Specify botId in environment');
  process.exit(1);
}

if (!process.env.apiKey) {
  console.log('Error: Specify apiKey in environment');
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
'use strict';

let util = require('util');
let http = require('http');
let Bot  = require('@kikinteractive/kik');
let Kik = require('./index').Kik({
  botId: process.env.botId,
  apiKey: process.env.apiKey,
  username: process.env.KIK_USERNAME
});

// Configure the bot API endpoint, details for your bot
let bot = new Bot({
    username: process.env.KIK_USERNAME,
    apiKey: process.env.KIK_API_KEY,
    baseUrl: 'https://mevbot.ngrok.io/kik'
});
bot.use(Kik.receive);
bot.outgoing(Kik.send);

bot.updateBotConfiguration();

bot.onTextMessage((message) => {
    message.reply(message.body);
});

// Set up your server and start listening
let server = http
    .createServer(bot.incoming())
    .listen(process.env.port || 3000);
