'use strict';
const express = require('express');
const router = express.Router();
const LobbyController = require('../controllers').Lobby;
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(ProfileController.getAll)
  ;



module.exports = router;
