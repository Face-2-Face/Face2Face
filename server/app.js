'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


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
//allows us to use React Router
app.use('*', routes.auth);

//socket.io connection
io.on('connection', function(socket) {
  // socket.emit('server event', {hola: 'mundo'});
  socket.on('client message', function(message) {
    console.log('this is the message', message);
    socket.broadcast.emit('message', message);
  });
  console.log('user connection established');
  socket.on('disconnect', function() {
    console.log('user connection disconnected');
  });
});

http.listen(8080, function() {
  console.log('listening on port 8080');
});

module.exports = app;
