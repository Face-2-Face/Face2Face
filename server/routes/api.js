'use strict';
const express = require('express');
const router = express.Router();

router.route('/user')
  .get((req, res) => {
    res.status(200).send(req.user);
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

module.exports = router;
