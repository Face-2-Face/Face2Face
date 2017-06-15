'use strict';
const express = require('express');
const router = express.Router();

const MatchController = require('../controllers').Matches;
const LobbyController = require('../controllers').Lobby;
const ProfileController = require('../controllers').Profiles;

router.route('/')
  .get(MatchController.getAll)
  ;

router.route('/:id')
  .get(MatchController.getUserMatches)
  ;

router.route('/accept')
  .put(MatchController.acceptOther)
  ;

router.route('/reject')
  .put(MatchController.rejectOther)
  ;

module.exports = router;
