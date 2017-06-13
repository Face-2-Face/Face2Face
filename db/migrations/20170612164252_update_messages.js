
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
    table.string('bio', 255).nullable();
    }),
    knex.schema.table('conversations', function(table) {
      table.dropColumn('message_count');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.dropColumn('message_count');
    }),
    knex.schema.table('profiles', function(table) {
    table.boolean('inLobby').defaultTo(false);
    })
  ]);
};
