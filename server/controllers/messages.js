const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log('this is the getAll in messages');
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
    // models.Messages.where({conversation: req.body}).fetch()
    //   .then(messages => {
    //     console.log('this is the message in addToMessages', messages);
    //   })
    //   .catch(err => {
    //     res.status(503).send(err);
    //   });
    let msg = req.body;
    console.log('type of', typeof(msg.from));
    models.Messages.forge({
      recipient: msg.from,
      sender: msg.to,
      conversation: msg.conversation_id,
      content: msg.message
    })
    .save()
    .then(messages => {
      res.status(201).send(messages);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

// module.exports.create = (req, res) => {
//   models.Profile.forge({ username: req.body.username, password: req.body.password })
//     .save()
//     .then(result => {
//       res.status(201).send(result.omit('password'));
//     })
//     .catch(err => {
//       if (err.constraint === 'users_username_unique') {
//         return res.status(403);
//       }
//       res.status(500).send(err);
//     });
// };


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
