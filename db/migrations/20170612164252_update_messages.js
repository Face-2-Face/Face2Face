
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.string('messages', 255).nullable();
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
    })
  ]);
};
