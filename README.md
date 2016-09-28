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


