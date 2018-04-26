'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  console.log(type);
  console.log(seed);
  return db.all(`
  CREATE TABLE fake_api.users
  (
     id serial NOT NULL, 
     email text NOT NULL, 
     password text NOT NULL, 
     CONSTRAINT pkey_users_id PRIMARY KEY (id), 
     CONSTRAINT uniq_users_id UNIQUE (id), 
     CONSTRAINT uniq_users_email UNIQUE (email)
  ) 
  WITH (
    OIDS = FALSE
  );
  
  ALTER TABLE fake_api.users
      OWNER to postgres;
  `, [], (err, res) => console.log(err || res));
};

exports.down = function(db) {
  console.log(type);
  console.log(seed);
  return db.all(`
  DROP TABLE fake_api.users
  `, [], (err, res) => console.log(err || res));
};

exports._meta = {
  'version': 1
};
