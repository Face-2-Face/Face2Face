
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
    table.boolean('inLobby').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('inLobby');
    })
  ]);
};
