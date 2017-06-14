'use strict';
const express = require('express');
const router = express.Router();

const ChatController = require('../controllers').Chat;

router.route('/')
  .get(ChatController.getPath)
  ;

router.route('/:id')
  .get(ChatController.getPath)
  ;
  
module.exports = router;
