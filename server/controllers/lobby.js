const models = require('../../db/models');


module.exports.addToLobby = (req, res) => {
    console.log('here in addToLoby', req.user)
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
  models.Profile.query(function(qb) {
//  qb.where('gender', '=', req.user.prefGender)
  qb.where('room', '=', 'lobby')
   .andWhere('id', '<>', req.user.id)
  // .andWhere('age_min', '>', req.user.prefAge_min)
//  .andWhere('age_max', '<', req.user.preAge_max)
  }).fetchAll()
  .then(function(model) {
    // pick one matching model
    var index = randomlySelectProfile(model.models.length);
    console.log('MATCHING MODEL', model.models[index]);
    res.status(200).send(model.models[index]);
  })
  .catch(() => {
    res.sendStatus(404);
  });
};

<<<<<<< HEAD
||||||| merged common ancestors
  // Get your profile and Check if you already have a room assignment
  // 
  models.Profile.where({ id: req.user.id}).fetch()
    .then(profile => {
        let result;
        if (!profile) {
        throw profile;
      }
      console.log('ROOM in MODEL', profile.get("room"));
      if (profile.get("room") !== 'lobby' && profile.get("room") !== 'false') {
        result = {room: profile.get("room"), otherID: null}
        res.status(200).send(result);
      } else {
        // do DB query to try to find a match
        result = {room: 'lobby', otherID: null}
        res.status(200).send(result);
      }
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
=======
  // Get your profile and Check if you already have a room assignment
  // 
  models.Profile.where({ id: req.user.id}).fetch()
    .then(profile => {
        let result;
        if (!profile) {
        throw profile;
      }
      console.log('ROOM in MODEL', profile.get("room"));
      if (profile.get("room") !== 'lobby') {
        result = {room: profile.get("room"), otherID: null}
        res.status(200).send(result);
      } else {
        // do DB query to try to find a match
        if (profile.get("id") === 12) {
          result = {room: '12-13', otherID: 13};
        } else {
          result = {room: 'lobby', otherID: null};
        }
        res.status(200).send(result);
      }
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
>>>>>>> Assign user to a video chat room who is the first user

  models.Profile.query(function(qb) {
  qb.where('gender', '=', req.user.prefGender)
  .andWhere('id', '<>', req.user.id)
  .andWhere('age_min', '>', req.user.prefAge_min)
  .andWhere('age_max', '<', req.user.preAge_max)
  }).fetch()
  .then(function(model) {
    // pick one matching model 
    console.log('MATCHING MODEL', model);
    res.status(200).send(model);
  })
  .catch(() => {
    res.sendStatus(404);
  });

randomlySelectProfile = (max) => {
  return Math.floor(Math.random() * (max));
}

};
