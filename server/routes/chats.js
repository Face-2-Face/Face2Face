'use strict';
const express = require('express');
const router = express.Router();
const LobbyController = require('../controllers').Lobby;

router.route('/')
  .get(LobbyController.getPersonToChat)
  ;

router.route('/:id')
  .put(LobbyController.addToLobby)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;