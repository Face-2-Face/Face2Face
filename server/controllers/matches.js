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
};

module.exports.acceptOther = (req, res) => {
  var otherID = req.body.otherID;
  var userID = req.body.userID;
  // res.status(200).send({yes: otherID, no: userID});
  // there is a record for me already (YES)
  console.log('BEFORE FORGE', otherID, userID);
  models.Matches.forge( { user_id: 6, match: 7, temp: true} )
    .save()
    .then(result => {
      console.log('IN FORGE');
      res.status(201).send(result);
    })
    .catch(err => {
      res.status(500).send('FORGE NOT WORKING');
    });

  // models.Matches.where( {user_id: otherID, match: userID} ).fetch()
  //   .then(profile => {
  //     console.log('matches.js profile ----->', profile );
  //     // if match === undefined then update with new row user_id: userID and match: otherID temp: true
  //     if (profile === null) {
  //       models.Matches.forge({ user_id: 6, match: 7, temp: true})
  //         .save()
  //         .then(result => {
  //           res.status(201).send(result);
  //         })
  //         .catch(err => {
  //           res.status(500).send(err);
  //         });
  //     }
  //     // } else {
  //     //   return profile.save( { temp: false}, {method: 'update'})
  //     //   .then(() => {
  //     //     models.Matches.forge({ user_id: userID, match: otherID, temp: true})
  //     //       .save()
  //     //       .then(result => {
  //     //         res.status(201).send('DONE MATCHES');
  //     //       })
  //     //       .catch(err => {
  //     //         res.status(500).send(err);
  //     //       });          
  //     //   })
  //     //   .catch(err => {
  //     //     res.status(503).send(err);
  //     //   });
  //     // }
  //   })
  //   .catch(err => {
  //     res.status(503).send(err);      
  //   });
}
    
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
      // else 1. udpate that model with temp=false 2. new row user_id: userID match: otherID temp: true


module.exports.rejectOther = (req, res) => {
  let otherID = req.body.otherID;
  let userID = req.body.userID;

}
