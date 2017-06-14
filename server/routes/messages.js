'use strict';
const express = require('express');
const router = express.Router();
const MessagesController = require('../controllers').Messages;

router.route('/')
  .get(MessagesController.getAll)
  .put(MessagesController.addToMessages)
  ;

router.route('/:id')
  .get(MessagesController.getConversation)
  // .put(MessagesController.addToMessages)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
