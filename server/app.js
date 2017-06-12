'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var randomName = require('./randomname');



const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

//private room var
//const match = io.of('/matchexample');

http.listen(port, function() {
  console.log('listening on port ' + port);
});

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
app.use('/api/lobby', routes.lobby);
app.use('/api/matches', routes.matches);

//added chats route
app.use('/api/chats', routes.chats);


app.get('/token', function(request, response) {
  var identity = randomName();

  // Create an access token which we will sign and return to the client,
  // containing the grant we just created.
  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  // Assign the generated identity to the token.
  token.identity = identity;

  // Grant the access token Twilio Video capabilities.
  var grant = new VideoGrant();
  token.addGrant(grant);

  // Serialize the token to a JWT string and include it in a JSON response.
  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

//allows us to use React Router..
app.get('/*', (req,res) => {
    res.render('index.ejs');
});


// var io = require('socket.io')(http);

io.sockets.on('connection', function (socket) {
  console.log('socket connection to private room')
  socket.on('join', function (data) {
    socket.join(data.path); // We are using room of socket io
  });
  socket.on('message', function(message) {
    console.log('this is the message in the server', message);
    io.sockets.in(message.path).emit('message', message);
  });
});
// //socket.io connection
// io.on('connection', function(socket) {
//   // socket.emit('server event', {hola: 'mundo'});
//   console.log('user connection established');
//   socket.on('message', function(message) {
//
//     console.log('this is the message in the server', message);
//
//     io.emit('message', message);
//   });
//   socket.on('disconnect', function() {
//     console.log('user connection disconnected');
//   });
// });

  // match.on('connection', function(socket) {
  // console.log('matches found');
  // socket.on('message', function(message) {

  //   console.log('this is the matches message in the server', message);

  //   match.emit('message', message);
  // });
  // socket.on('disconnect', function() {
  //   console.log('match lost');
  // });
// });

module.exports = app;
