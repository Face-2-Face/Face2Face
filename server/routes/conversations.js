'use strict';
const express = require('express');
const router = express.Router();
const ConversationsController = require('../controllers').Conversations;

router.route('/')
  .get(ConversationsController.getAll)
  ;

router.route('/')
  .put(ConversationsController.addToConversations)
  .get(ConversationsController.getConvo)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
