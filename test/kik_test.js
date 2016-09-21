var chai = require('chai');
var sinon = require('sinon');
var nock = require('nock');
var Kik = require('../src/kik');

chai.use(require('sinon-chai'));
expect = chai.expect;

describe('Kik without creds', function() {
  context('botId is not present', function(){
    it('should throw an error', function(done) {
      expect(Kik.bind(null, { appKey: 'app-key', username: 'username' })).to.throw('No bot id or api key or username specified');
      done()
    })
  });

  context('appKey is not present', function(){
    it('should throw an error', function(done) {
      expect(Kik.bind(null, { botId: 'bot-id', username: 'username' })).to.throw('No bot id or api key or username specified');
      done()
    })
  });

  context('username is not present', function(){
    it('should throw an error', function(done) {
      expect(Kik.bind(null, { botId: 'bot-id', appKey: 'app-key' })).to.throw('No bot id or api key or username specified');
      done()
    })
  })
})

describe('Kik with creds', function() {
  it('should not throw an error', function(done) {
    expect(Kik.bind(null, { botId: 'bot-id', apiKey: 'api-key', username: 'username' })).to.not.throw('No bot id or api key or username specified');
    done()
  })

})

describe('.receive', function() {
  var kik,
      message,
      statusCode,
      params,
      kikHookResponse;

  beforeEach(function() {
    kik = Kik({
      botId: 'bot-id',
      apiKey: 'api-key',
      username: 'username'
    });

    message = {
      _state: {
        type: 'text',
        body: 'Hi',
        from: 'vlad.shevtsov',
        timestamp: 1473155458293,
        mention: null,
        participants: [ 'vlad.shevtsov' ],
        readReceiptRequested: true,
        id: 'id',
        chatId: 'chat-id'
      }
    };

    params = JSON.stringify({ event: JSON.stringify([message._state]), format: 'json' })
    console.log(params);
    scope = nock('http://localhost:3000', {
      reqheaders: {
        'Authorization': 'api-key',
        'Content-Type': 'application/json'
      }
    })
    .post('/bots/bot-id/events', params)
    .reply(statusCode);
  });

  context('API returns correct status code', function() {
    before(function() {
      statusCode = 202;
    });

    it('should make a call to the Botmetrics API sending a message', function(done) {
      kik.receive(message, function(err) {
        expect(err).to.be.undefined;
        expect(scope.isDone()).to.be.true;
        done();
      });
    });
  });

  context('API returns incorrect status code', function() {
    before(function() {
      statusCode = 401;
    });

    it('should make a call to the Botmetrics API sending a message', function(done) {
      kik.receive(message, function(err) {
        expect(err).to.be.present;
        expect(scope.isDone()).to.be.true;
        done();
      });
    });
  });
});

describe('.send', function() {
  var kik,
      message,
      statusCode,
      params,
      kikHookResponse;

  beforeEach(function() {
    kik = Kik({
      botId: 'bot-id',
      apiKey: 'api-key',
      username: 'username'
    });

    message = {
      type: 'text',
      body: 'Hi',
      to: 'to',
      chatId: 'chat-id'
    };

    params = JSON.stringify({ event: JSON.stringify([message._state]), format: 'json' })
    console.log(params);
    scope = nock('http://localhost:3000', {
      reqheaders: {
        'Authorization': 'api-key',
        'Content-Type': 'application/json'
      }
    })
    .post('/bots/bot-id/events')
    .reply(statusCode);
  });

  context('API returns correct status code', function() {
    before(function() {
      statusCode = 202;
    });

    it('should make a call to the Botmetrics API sending a message', function(done) {
      kik.receive(message, function(err) {
        expect(err).to.be.undefined;
        expect(scope.isDone()).to.be.true;
        done();
      });
    });
  });

  context('API returns incorrect status code', function() {
    before(function() {
      statusCode = 401;
    });

    it('should make a call to the Botmetrics API sending a message', function(done) {
      kik.receive(message, function(err) {
        expect(err).to.be.present;
        expect(scope.isDone()).to.be.true;
        done();
      });
    });
  });
});
