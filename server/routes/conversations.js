'use strict';
const express = require('express');
const router = express.Router();
const ConversationsController = require('../controllers').Conversations;

router.route('/')
  .get(ConversationsController.getAll)
  .put(ConversationsController.addToConversations)
  ;

router.route('/:id')
  .get(ConversationsController.getConvo)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
