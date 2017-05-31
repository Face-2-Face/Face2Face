module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  pool: {
      "min": 2,
      "max": 10
    },
    migrations: {
      "tableName": "knex_migrations",
      "directory": "db/migrations"
    },
    seeds: {
      "directory": "db/seeds"
    },
    debug: false
};
