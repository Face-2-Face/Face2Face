const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Messages.fetchAll()
    .then(messages => {
      console.log('this is the message in the controller', messages)
      res.status(200).send(messages);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.addToMessages = (req, res) => {
    console.log('this is the request body in the messages', req.body)
    models.Messages.where({messages: req.body}).fetch()
      .then()
};


// module.exports.getUserMatches = (req, res) => {
//   models.Matches.where({ user_id: req.params.id })
// //    .fetch({withRelated: ['profile']})
//     .fetchAll()
// //    knex.raw(`select * from profiles where id=${req.params.id}`)
//     .then(matches => {
//       console.log('hello from match fetch', matches)
//       res.status(200).send(matches);
//     })
//     .catch(err => {
//       res.status(503).send(err);
//     });
// }
