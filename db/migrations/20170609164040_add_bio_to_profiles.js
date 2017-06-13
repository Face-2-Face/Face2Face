
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
    table.string('bio', 255).nullable();
    }),
    knex.schema.table('profiles', function(table) {
      table.dropColumn('inLobby');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('bio');
    }),
    knex.schema.table('profiles', function(table) {
    table.boolean('inLobby').defaultTo(false);
    })
  ]);
};
