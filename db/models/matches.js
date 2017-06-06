const db = require('../');

const Matches = db.Model.extend({
  tableName: 'matches',
  profile: function() {
    return this.hasMany('Profile')
  }
});

module.exports = db.model('Matches', Matches);
