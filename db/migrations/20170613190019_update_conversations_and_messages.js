
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.integer('id');
    }),
    knex.schema.table('messages', function(table) {
      table.integer('id');
      table.integer('conversation').references('conversations.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.dropColumn('id');
    }),
    knex.schema.table('messages', function(table) {
      table.dropColumn('id');
      table.dropColumn('conversation');
    }),
  ]);
};
