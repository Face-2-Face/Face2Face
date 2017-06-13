const db = require('../');

const Conversations = db.Model.extend({
  tableName: 'conversations',
  messages: function() {
    return this.hasMany('Messages')
  }
});

module.exports = db.model('Conversations', Conversations);
