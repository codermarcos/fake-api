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
  CREATE TABLE fake_api.auth
  (
      id serial NOT NULL, 
      id_user integer NOT NULL, 
      token text NOT NULL, 
      CONSTRAINT pkey_auth_id PRIMARY KEY (id), 
      CONSTRAINT uniq_auth_id UNIQUE (id), 
      CONSTRAINT uniq_auth_token UNIQUE (token), 
      CONSTRAINT fkey_auth_user_id FOREIGN KEY (id_user) REFERENCES fake_api.users (id) ON UPDATE NO ACTION ON DELETE NO ACTION
  ) 
  WITH (
    OIDS = FALSE
  );
  
  ALTER TABLE fake_api.auth
      OWNER to postgres;
  `, [], (err, res) => console.log(err || res));
};

exports.down = function(db) {
  console.log(type);
  console.log(seed);
  return db.all(`
  DROP TABLE fake_api.auth
  `, [], (err, res) => console.log(err || res));
};

exports._meta = {
  'version': 1
};
