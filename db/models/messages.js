const db = require('../');

const Messages = db.Model.extend({
  tableName: 'messages',
  // profile: function() {
  //   return this.hasMany('Profile')
  // }
  
});

module.exports = db.model('Messages', Messages);
