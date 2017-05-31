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
    } || process.env.HEROKU_POSTGRESQL_AQUA_URL,
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

// module.exports.development = {
//   client: "postgresql",
//   connection: process.env.HEROKU_POSTGRESQL_AQUA_URL,
//   pool: {
//       "min": 2,
//       "max": 10
//     },
//     migrations: {
//       "tableName": "knex_migrations",
//       "directory": "./db/migrations"
//     },
//     seeds: {
//       "directory": "./db/seeds"
//     },
//     debug: false
// };
