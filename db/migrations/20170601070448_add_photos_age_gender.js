
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.string('photo', 255).nullable();
      table.string('age_min', 8).nullable();
      table.string('age_max', 8).nullable();
      table.string('gender', 20).nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('profiles', function (table) {
      table.dropColumn('photo');
      table.dropColumn('age_min');
      table.dropColumn('age_max');
      table.dropColumn('gender');
    })
  ]);
};