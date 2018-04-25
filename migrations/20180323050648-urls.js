'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  console.log(type);
  console.log(seed);
  return db.all(`
  CREATE TABLE fake_api.urls
  (
      id serial NOT NULL,
      url text NOT NULL,
      method text NOT NULL DEFAULT 'GET',
      body text,
      headers text,
      status integer NOT NULL DEFAULT 200,
      PRIMARY KEY (id)
  )
  WITH (
      OIDS = FALSE
  );
  
  ALTER TABLE fake_api.urls
      OWNER to postgres;
  `, [], (err, res) => console.log(err || res));
};

exports.down = function (db) {
  console.log(type);
  console.log(seed);
  return db.all(`
  DROP TABLE fake_api.urls
  `, [], (err, res) => console.log(err || res));
};

exports._meta = {
  'version': 1
};
