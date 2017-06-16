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
  models.Matches.where({ user_id: req.params.id, userResponse: true, otherResponse: true })
    .fetchAll()
    .then(matches => {
      console.log('hello from match fetch', matches)
      res.status(200).send(matches);
    })
    .catch(err => {
      res.status(503).send(err);
    });
};

module.exports.acceptOther = (req, res) => {
  var userID = req.body.userID;
  var otherID = req.body.otherID;
  var userIDclone = req.body.userID;
  var otherIDclone = req.body.otherID;
  // res.status(200).send({yes: otherID, no: userID});
  // there is a record for me already (YES)
  console.log('userID', userID, userIDclone);
  console.log('otherID', otherID, otherIDclone);

  models.Matches.where( {user_id: otherID, other_id: userID} ).fetch()
    .then(matchResponse => {
      console.log('matches.js profile ----->', matchResponse );
      // if match === undefined then update with new row user_id: userID and match: otherID temp: true
      if (matchResponse === null) {
        models.Matches.forge({ user_id: userIDclone, other_id: otherIDclone, userResponse: true})
          .save()
          .then(result => {
            res.status(201).send(result);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      } else if (matchResponse.get("userResponse") === true) {
        matchResponse.save({otherResponse: true}, {method: 'update'});
        models.Matches.forge({ user_id: userIDclone, other_id: otherIDclone, userResponse: true, otherResponse: true})
          .save()
          .then(result => {
            res.status(201).send('matched');
          })
          .catch(err => {
            res.status(500).send(err);
          });
      } else {
        matchResponse.destroy();
      }
    })
    .catch(err => {
      res.status(503).send(err);      
    });
};
    
module.exports.rejectOther = (req, res) => {
  let otherID = req.body.otherID;
  let userID = req.body.userID;

  models.Matches.where( {user_id: otherID, other_id: userID} ).fetch()
    .then(profile => {
      console.log('matches.js profile ----->', profile );
      // if match === undefined then update with new row user_id: userID and match: otherID temp: true
      if (profile === null) {
        models.Matches.forge({ user_id: userID, other_id: otherID, userResponse: false})
          .save()
          .then(result => {
            res.status(201).send(result);
          })
          .catch(err => {
            res.status(500).send(err);
          });
      } else {
        profile.destroy();
        res.sendStatus(200);
      }
    })
    .catch(err => {
      res.status(503).send(err);      
    });
};


/*

// module.exports.deleteOne = (req, res) => {
//   models.Profile.where({ id: req.params.id }).fetch()
//     .then(profile => {
//       if (!profile) {
//         throw profile;
//       }
//       return profile.destroy();
//     })
//     .then(() => {
//       res.sendStatus(200);
//     })
//     .error(err => {
//       res.status(503).send(err);
//     })
//     .catch(() => {
//       res.sendStatus(404);
//     });
// };
*/