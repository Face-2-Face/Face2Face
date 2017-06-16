const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  console.log('this is the comment from getAll in conversations');
  models.Conversations.fetchAll()
    .then(conversations => {
      res.status(200).send(conversations);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.addToConversations = (req, res) => {
    models.Conversations.forge( {user1_id: req.body.user1_id, user2_id: req.body.user2_id} )
      .save()
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(500).send(err);
      });
};

module.exports.getConvo = (req, res) => {
  var IDs = req.params.id.split('z');
  console.log('made it to get convo ', IDs)
  models.Conversations.where({ user1_id: IDs[0], user2_id: IDs[1]}).fetchAll()
    .then(conversation => {
      console.log('GOT CONVO: ', conversation)
      if (!conversation) {
        throw conversation;
      }
      res.status(200).send(conversation);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
