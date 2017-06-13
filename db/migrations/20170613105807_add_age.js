exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.integer('age_min');
      table.integer('age_max');
      table.integer('prefAge_min');
      table.integer('prefAge_max');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function(table) {
      table.dropColumn('age_min');
      table.dropColumn('age_max');
      table.dropColumn('prefAge_min');
      table.dropColumn('prefAge_max');
    })
  ]);
};
