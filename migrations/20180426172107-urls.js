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
      id_owner integer, 
      url text NOT NULL,
      method text NOT NULL DEFAULT 'GET',
      body text,
      headers text,
      status numeric NOT NULL DEFAULT 200,
      CONSTRAINT pkey_urls_id PRIMARY KEY (id), 
      CONSTRAINT uniq_urls_id UNIQUE (id), 
      CONSTRAINT fkey_urls_id_owner FOREIGN KEY (id_owner) REFERENCES fake_api.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION
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
