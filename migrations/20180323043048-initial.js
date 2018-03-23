'use strict';

var dbm;
var type;
var seed;

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.all(`
  CREATE SCHEMA fake_api
    AUTHORIZATION postgres;
  `, [], (err, res) => console.log(err||res));
};

exports.down = function (db) {
  return db.all(`
  DROP SCHEMA fake_api
  `, [], (err, res) => console.log(err||res));
};

exports._meta = {
  'version': 1
};
