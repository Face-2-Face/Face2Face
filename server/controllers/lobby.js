const models = require('../../db/models');


module.exports.addToLobby = (req, res) => {
    console.log('here in addToLobby', req.user)
    models.Profile.where({ id: req.params.id }).fetch()
    .then(profile => {
      if (!profile) {
        throw profile;
      }
      return profile.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.getPersonToChat = (req, res) => {
  models.Profile.where({ id: req.user.id}).fetch()
    .then(profile => {
        let result;
        if (!profile) {
        throw profile;
      }
      console.log('lobby.js User1/2 Room -----> ', profile.get("room"));
      var room = profile.get("room"); 
      if (room !== 'lobby' && room !== 'false') {
          var user1 = room.slice(0, room.indexOf('-'));
          console.log('user1', user1);
          var user2 = room.slice(room.indexOf('-')+1);
          console.log('user2', user2);
          var otherID = Number.parseInt(user1) === profile.get("id") ? user2 : user1;
          console.log('lobby.js other ID ----->', otherID);
          result = {room: room, otherID: otherID};
          res.status(200).send(result);
      } else if (room === 'lobby') {
          models.Profile.query(function(qb) {
              qb.where('room', '=', 'lobby')
              .andWhere('id', '<>', req.user.id)
              .andWhere('age_min', '>', req.user.prefAge_min)
             .andWhere('age_max', '<', req.user.prefAge_max)
             .andWhere('prefAge_min', '<', req.user.age_min)
             .andWhere('prefAge_max', '>', req.user.age_max)
             .andWhere('gender', '=', req.user.prefGender)
             .andWhere('prefGender', '=', req.user.gender)
              }).fetchAll()
              .then(function(model) {
                // pick one matching model
                if (model.length > 0) {
                  var index = randomlySelectProfile(model.models.length);
                  var randomProfile = model.models[index];
                  var room = profile.get("id") + '-' + randomProfile.get("id");
                  console.log('lobby.js User1 ----->', randomProfile, room);
                  result = {room: room, otherID: randomProfile.get("id")};
                } else {
                  result = {room: 'lobby', otherID: null};          
                }
                res.status(200).send(result);
              })
              .catch(() => {
                res.sendStatus(404);
              });
      }
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

randomlySelectProfile = (max) => {
  return Math.floor(Math.random() * (max));
}
