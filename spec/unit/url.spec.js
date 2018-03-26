
process.argv.push('mode=test');

const assert = require('assert')
  , chai = require('chai')
  , expect = chai.expect

  , { path } = require('../common')

  , controller = require(`${path.controllers}/url.controller`);

describe('Url', () => {
  describe('Controller', () => {

    it(
      'should be created',
      () => {
        assert.ok(controller, 'controller not exist');
      }
    );

    it(
      'has methods',
      () => {
        expect(controller).to.have.property('create');
      }
    );

    it(
      'validate body params',
      () => {
      }
    );
  });
});
