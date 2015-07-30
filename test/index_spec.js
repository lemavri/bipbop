var should = require('should'),
    request = require('supertest'),
    app = require('./../index.js');

describe('/api/balance', function() {

  describe('on existing Bip! card', function() {

    var url = '/api/balance/12345';

    it('does not return error', function(done) {
      request(app).get(url).end(function(err, res) {
        should(res.error).be.null;
        done();
      });
    });

    it('returns status code 200', function(done) {
      request(app).get(url).end(function(err, res) {
        res.statusCode.should.equal(200);
        done();
      });
    });

    it('returns balance', function(done) {
      request(app).get(url).end(function(err, res) {
        JSON.parse(res.text).balance.should.exist;
        done();
      });
    });

  });

  describe('on non-existing Bip! card', function() {

    var url = '/api/balance/12345asdfasdf';

    it('does not return error', function(done) {
      request(app).get(url).end(function(err, res) {
        should(res.error).be.null;
        done();
      });
    });

    it('returns status code 404', function(done) {
      request(app).get(url).end(function(err, res) {
        res.statusCode.should.equal(404);
        done();
      });
    });

    it('does not return balance', function(done) {
      request(app).get(url).end(function(err, res) {
        should(JSON.parse(res.text).balance).be.null;
        done();
      });
    });

  });

  describe('on empty Bip! card number', function() {

    var url = '/api/balance/';

    it('returns error', function(done) {
      request(app).get(url).end(function(err, res) {
        should(res.error).be.null;
        done();
      });
    });

    it('returns status code 404', function(done) {
      request(app).get(url).end(function(err, res) {
        res.statusCode.should.equal(404);
        done();
      });
    });

    it('does not return balance', function(done) {
      request(app).get(url).end(function(err, res) {
        res.text.should.eql('Cannot GET /api/balance/\n');
        done();
      });
    });


  });

});
