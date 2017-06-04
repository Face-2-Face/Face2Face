const models = require('../../db/models');


module.exports.addToLobby = (req, res) => {
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

};