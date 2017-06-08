
exports.up = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.string('fb_id', 20).nullable();
      table.string('location', 255).nullable();
      table.string('prefAge_min', 8).nullable();
      table.string('prefAge_max', 8).nullable();
      table.string('prefGender', 20).nullable();
    }),
    knex.schema.createTableIfNotExists('matches', function(table) {
      table.increments('matches_id').unsigned().primary();
      table.integer('user_id').references('profiles.id').onDelete('CASCADE');
      table.integer('match').references('profiles.id').onDelete('CASCADE');
    }),
      knex.schema.createTableIfNotExists('conversations', function(table) {
      table.increments('conversation_id').unsigned().primary();
      table.integer('user1_id').references('profiles.id').onDelete('CASCADE');
      table.integer('user2_id').references('profiles.id').onDelete('CASCADE');
      table.integer('message_count');
    }),
      knex.schema.createTableIfNotExists('messages', function(table) {
      table.increments('message_id').unsigned().primary();
      table.integer('recipient').references('profiles.id').onDelete('CASCADE');
      table.integer('sender').references('profiles.id').onDelete('CASCADE');
      table.integer('conversation').references('conversations.conversation_id').onDelete('CASCADE');
      table.text('content').nullable();
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.dropTable('matches'),
    knex.schema.dropTable('conversations'),
    knex.schema.dropTable('messages'),
    knex.schema.table('profiles', function (table) {
      table.dropColumn('fb_id');
      table.dropColumn('location');
      table.dropColumn('prefAge_min');
      table.dropColumn('prefAge_max');
      table.dropColumn('gender');
    })
  ]);
};