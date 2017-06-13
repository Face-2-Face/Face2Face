'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const middleware = require('./middleware');
const routes = require('./routes');
var AccessToken = require('twilio').jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

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
app.use('/api/messages', routes.messages);


app.get('/token', function(request, response) {
  var identity = request.user.display;

  var token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET
  );

  token.identity = identity;

  var grant = new VideoGrant();
  token.addGrant(grant);

  response.send({
    identity: identity,
    token: token.toJwt()
  });
});

//allows us to use React Router..
app.get('/*', (req,res) => {
    res.render('index.ejs');
});

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

module.exports = app;
