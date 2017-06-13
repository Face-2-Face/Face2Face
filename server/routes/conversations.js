'use strict';
const express = require('express');
const router = express.Router();
const ConversationsController = require('../controllers').Conversations;

router.route('/')
  .get(ConversationsController.getAll)
  ;

router.route('/:id')
  .put(ConversationsController.addToConversations)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;