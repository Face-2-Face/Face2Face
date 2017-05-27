'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));


app.use('/', routes.auth);
app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
//app.use('/', './client.index.html');

// app.get('/', function(req, res) {
//   console.log(__dirname);
//     res.sendFile('/Users/matthewaguirre/Face2Face/client/index.html');
// });
//
// app.use('/client', express.static(__dirname + '../client'));
// app.use('/', express.static(__dirname + '../client'));

// app.use('/', routes.auth);
// app.use('/', express.static(path.join(__dirname, '../client/app')));
// app.use('/api', routes.api);
// app.use('/api/profiles', routes.profiles);


module.exports = app;
