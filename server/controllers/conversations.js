const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Conversations.fetchAll()
    .then(conversations => {
      console.log('this is the message in the controller', conversation)
      res.status(200).send(conversation);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.addToConversations = (req, res) => {
    console.log('this is the request body', req.body)
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
