'use strict';
const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfileController.getOne)
  .put(ProfileController.update)
  // .delete(ProfileController.deleteOne)
  ;
// router.route('/user')
//   .get(ProfileController.getUser)
//   ;
//
// router.route('/api/profiles/user')
//   .get(ProfileController.getUser)
//   ;

module.exports = router;

// for specific routes, put something like this in here:
//router.route('/specific')
