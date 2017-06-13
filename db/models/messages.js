const db = require('../');

const Messages = db.Model.extend({
  tableName: 'messages',
  conversations: function() {
    return this.hasMany('Conversations')
  }
});

module.exports = db.model('Messages', Messages);
