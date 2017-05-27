'use strict';
const express = require('express');
const path = require('path');
// const middleware = require('./middleware');
// const routes = require('./routes');

const app = express();
// const app = require('./app');
// const db = require('./db');
const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Better be listening on port ' + port);
});

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello World PLZ')
})

//another comment!!