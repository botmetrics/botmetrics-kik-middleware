var chai = require('chai');
var sinon = require('sinon');
var nock = require('nock');
var Kik = require('../src/kik');

chai.use(require('sinon-chai'));
expect = chai.expect;

describe('Kik without creds', function() {
  context('botId is not present', function(){
    it('should throw an error', function(done) {
      expect(Kik.bind(null, { appKey: 'app-key' })).to.throw('No bot id or api key specified');
      done()
    })
  });

  context('appKey is not present', function(){
    it('should throw an error', function(done) {
      expect(Kik.bind(null, { botId: 'bot-id' })).to.throw('No bot id or api key specified');
      done()
    })
  })
})

describe('Kik with creds', function() {
  it('should not throw an error', function(done) {
    expect(Kik.bind(null, { botId: 'bot-id', apiKey: 'api-key' })).to.not.throw('No bot id or api key specified');
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
      apiKey: 'api-key'
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
