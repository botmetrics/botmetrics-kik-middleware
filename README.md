# Botmetrics Middleware for kik-node

[Botmetrics](https://www.getbotmetrics.com) is an analytics and
engagement platform for chatbots.

[![Build
Status](https://travis-ci.org/botmetrics/botmetrics-kik-middleware.svg?branch=master)](https://travis-ci.org/botmetrics/botmetrics-kik-middleware)


## Installation

Add `botmetrics-kik-middleware` to your `package.json`

```
$ npm install --save botmetrics-kik-middleware
```

## Usage

Register your bot with
[Botmetrics](https://getbotmetrics.com). Once you have done so, navigate to "Bot Settings" and find out your Bot ID and API Key.

Set the following environment variables with the Bot ID and API
Key respectively.

```
BOTMETRICS_BOT_ID=your-bot-id
BOTMETRICS_API_KEY=your-api-key
```

Require `botmetrics-kik-middleware` and use the middleware in your bot like so:

```javascript
// Initialize the middleware with Botmetrics API Key, Botmetrics Bot ID
// and your Kik bot's username
var BotmetricsMiddleware = require('botmetrics-kik-middleware').BotmetricsMiddleware({
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

// Use the middleware
bot.use(BotmetricsMiddleware.receive);
bot.outgoing(BotmetricsMiddleware.send);
```

## Examples

To run the example, run the following command:

```
$ PORT=3000 node examples/example.js
```

Make sure you have `ngrok` running which tunnels to port 3000 (and set
the hostname of your ngrok tunnel in the environment variable
`KIK_WEBHOOK_HOST`.

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/botmetrics/botmetrics-kik-middleware. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

