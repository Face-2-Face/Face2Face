const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Matches.fetchAll()
    .then(matches => {
      console.log('hey', matches)
      res.status(200).send(matches);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};
