'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
const app = express();
console.log('these are the routes', routes.stack)

app.use(middleware.morgan('dev'));
app.use(middleware.cookieParser());
app.use(middleware.bodyParser.urlencoded({extended: false}));
app.use(middleware.bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(middleware.auth.session);
app.use(middleware.passport.initialize());
app.use(middleware.passport.session());
app.use(middleware.flash());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use('/', routes.auth);

app.use('/api', routes.api);
app.use('/api/profiles', routes.profiles);
app.use('/user', routes.user);


//allows us to use React Router
//app.use('*', routes.auth);



module.exports = app;
