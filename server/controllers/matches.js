const models = require('../../db/models');
const knex = require('knex')(require('../../knexfile'));

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

module.exports.getUserMatches = (req, res) => {
  models.Matches.where({ user_id: req.params.id })
//    .fetch({withRelated: ['profile']})
    .fetchAll()
//    knex.raw(`select * from profiles where id=${req.params.id}`)
    .then(matches => {
      console.log('hello from match fetch', matches)
      res.status(200).send(matches);
    })
    .catch(err => {
      res.status(503).send(err);
    });
}
