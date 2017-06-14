
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('matches', function(table) {
      table.boolean('temp').defaultTo(false);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('matches', function(table) {
      table.dropColumn('temp');
    })
  ]);
};
//this is a comment
