'use strict';
const express = require('express');
const router = express.Router();
const UserController = require('../controllers').User


// 'use strict';
// const express = require('express');
// const router = express.Router();
// const ProfileController = require('../controllers').Profiles;

// router.route('/')
//   .get(ProfileController.getAll)
  // .post(ProfileController.create)
  // ;
router.route('/')
  .get(UserController.getUser)
  ;

module.exports = router;
