
// exports.up = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.table('messages', function(table) {
//       table.dropColumn('conversation');
//       table.dropColumn('message_id');
//     })
//   ]);
// };

// exports.down = function(knex, Promise) {
//   return Promise.all([
//     knex.schema.table('messages', function(table) {
//       table.integer('conversation').references('conversations.conversation_id').onDelete('CASCADE');
//       table.increments('message_id').unsigned().primary();
//     })
//   ]);
// };
