const models = require('../../db/models');

module.exports.getUser = (req, res) => {
  console.log('hey I am here ', req.user);
  res.status(200).send(req.user);
}
