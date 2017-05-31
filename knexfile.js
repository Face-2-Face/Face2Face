// const config = require('config'); 

// module.exports = config['knex'];

module.exports = {
  client: "postgresql",
  connection: {
      "database": "face2face_devel",
      "user": "postgres",
      "password": "postgres",
      "host": "localhost",
      "port": 5432
    } || process.env.DATABASE_URL,
  pool: {
      "min": 2,
      "max": 10
    },
    migrations: {
      "tableName": "knex_migrations",
      "directory": "./db/migrations"
    },
    seeds: {
      "directory": "./db/seeds"
    },
    debug: false
};

module.exports.staging = {
  client: "postgresql",
  connection: process.env.DATABASE_URL,
  pool: {
      "min": 2,
      "max": 10
    },
    migrations: {
      "tableName": "knex_migrations",
      "directory": "./db/migrations"
    },
    seeds: {
      "directory": "./db/seeds"
    },
    debug: false
};


