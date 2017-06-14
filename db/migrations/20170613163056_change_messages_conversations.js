
// exports.up = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.table('conversations', function(table) {
//       table.dropColumn('conversation_id');
//     })
//   ]);
// };

// exports.down = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.table('conversations', function(table) {
//       table.increments('conversation_id').unsigned().primary();
//     })
//   ]);
// };
