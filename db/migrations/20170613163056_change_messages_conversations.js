
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('messages', function(table) {
      table.dropColumn('message_id');
      table.increments('id').unsigned().primary();
    }),
    knex.schema.table('conversations', function(table) {
      table.dropColumn('conversations_id');
      table.increments('id').unsigned().primary();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('messages', function(table) {
      table.increments('message_id').unsigned().primary();
    }),
    knex.schema.table('conversations', function(table) {
      table.increments('conversation_id').unsigned().primary();
    })
  ]);
};
