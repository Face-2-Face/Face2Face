
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.string('messages', 255).nullable();
    }),
    knex.schema.table('conversations', function(table) {
      table.dropColumn('message_count');
    }),
    knex.schema.table('profile', function(table) {
      table.dropColumn('age_min');
      table.dropColumn('age_max');
      table.dropColumn('prefAge_min');
      table.dropColumn('prefAge_max');
    }),
    knex.schema.table('profile', function(table) {
      table.integer('age_min');
      table.integer('age_max');
      table.integer('prefAge_min');
      table.integer('prefAge_max');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('conversations', function(table) {
      table.dropColumn('messages');
    }),
    knex.schema.table('conversations', function(table) {
      table.integer('message_count');
    }),
    knex.schema.table('profile', function(table) {
      table.string('age_min', 8).nullable();
      table.string('age_max', 8).nullable();
      table.string('prefAge_min', 8).nullable();
      table.string('prefAge_max', 8).nullable();
    }),
    knex.schema.table('profile', function(table) {
      table.dropColumn('age_min');
      table.dropColumn('age_max');
      table.dropColumn('prefAge_min');
      table.dropColumn('prefAge_max');
    })
  ]);
};
