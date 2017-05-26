'use strict';
const express = require('express');
const path = require('path');
// const middleware = require(‘./middleware’);
// const routes = require(‘./routes’);

const app = express();
// const app = require(‘./app’);
// const db = require(‘./db’);
const PORT = process.env.port || 3001;

app.listen(PORT, () => {
  console.log('Example app listening on port 3001!');
});

app.get('/', (req, res)=> res.send('hello world'));
