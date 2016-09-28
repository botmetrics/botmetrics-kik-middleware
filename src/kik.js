var HttpClient = require('scoped-http-client');
var crypto = require('crypto');

module.exports = function(credentials) {
  if (!credentials || !credentials.botId || !credentials.apiKey || !credentials.username) {
    throw new Error('No bot id or api key or username specified');
  }

  var host = process.env.BOTMETRICS_API_HOST || 'https://www.getbotmetrics.com',
      url  = host + "/bots/" + credentials.botId + "/events",
      http = HttpClient.create(url),
      Kik = {};

  Kik.receive = function(msg, next) {
    var event;
    if(Array.isArray(msg._state)) {
      event = JSON.stringify(msg._state);
    } else {
      event = JSON.stringify([msg._state]);
    }

    sendRequest(event, next);
  }

  Kik.send = function(msg, next) {
    crypto.randomBytes(16, function(err, buffer) {
      var event = JSON.stringify([{
        from: credentials.username,
        participants: [msg.to],
        id: buffer.toString('hex'),
        chatId: msg.chatId,
        body: msg.body,
        type: msg.type,
        timestamp: new Date().getTime()
      }])

      sendRequest(event, next)
    });

  }

  function sendRequest(event, next) {
    http.header('Authorization', credentials.apiKey).
         header('Content-Type', 'application/json').
         post(JSON.stringify({event: event, format: 'json'}))(function(err, resp, body) {
           if(err) {
             next(err);
           } else if (resp.statusCode != 202) {
             next(new Error("Unexpected Status Code from Botmetrics API"));
           } else {
             next();
           }
         });
  }

  return Kik
}
