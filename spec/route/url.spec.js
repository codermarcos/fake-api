
process.argv.push('mode=test');

const chaiHttp = require('chai-http')
  , assert = require('assert')
  , chai = require('chai')
  , expect = chai.expect
  , should = chai.should()

  , { path } = require('../common')

  , application = require('../../src/application');

chai.use(chaiHttp);

describe('Route', () => {

  describe('Url', () => {
    describe('Controller', () => {
  
      after(
        () => application.close()
      );
  
      it(
        'validate request',
        (done) => {
          const data = {};
          chai.request(application)
            .post('/url/create')
            .send(data)
            .end((err, res) => {
              res.should.have.status(422);
              res.body.should.be.a('object');
              res.text.should.be.eql('Url cannot be empty');
              done();
            });
        }
      );
  
    });
  });

});
