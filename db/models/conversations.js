const db = require('../');

const Conversations = db.Model.extend({
  tableName: 'conversations'
});

module.exports = db.model('Conversations', Conversations);
