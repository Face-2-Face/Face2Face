
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
    table.string('room', 20).defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('room');
    })
  ]);
};