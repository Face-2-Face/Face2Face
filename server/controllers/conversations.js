const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log('this is the comment from getAll in conversations');
  models.Conversations.fetchAll()
    .then(conversations => {
      // console.log('this is the message in the controller', conversations)
      res.status(200).send(conversations);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.addToConversations = (req, res) => {
    console.log('this is the request body in the conversations', req.body)
};

module.exports.getConvo = (req, res) => {
  console.log('made it to get convo ', req.params)
}

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
