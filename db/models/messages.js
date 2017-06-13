const db = require('../');

const Messages = db.Model.extend({
  tableName: 'messages',
  conversations: function() {
    return this.belongsTo('Conversations');
  }
});

module.exports = db.model('Messages', Messages);
