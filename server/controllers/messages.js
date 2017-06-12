const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Messages.fetchAll()
    .then(matches => {
      console.log('this is the message in the controller', messages)
      res.status(200).send(messages);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.addToMessages = (req, res) => {
    console.log('this is the user in the messages controller', req.user)
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
