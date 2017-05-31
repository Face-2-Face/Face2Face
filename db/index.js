const knex = require('knex')(require('../knexfile')[process.env.DATABASE_URL]);
const db = require('bookshelf')(knex);

db.plugin('registry');

module.exports = db;

