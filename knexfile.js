module.exports = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL + '?ssl=true',
  pool: {
    'min': 2,
    'max': 10
  },
  migrations: {
      'tableName': 'knex_migrations',
      'directory': './db/migrations'
    },
  seeds: {
      'directory': './db/seeds'
    },
  debug: false
};

//this is a comment