const session = require('express-session');
const RedisStore = require('connect-redis')(session);
// const redisClient = require('redis').createClient();
const redisClient = require('redis').createClient(process.env.REDIS_URL);
module.exports.verify = (req, res, next) => {
  console.log('verify request');
  if (req.isAuthenticated()) {
    return next();
  }
  console.log('not auth');
  //res.redirect('/profile');
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    client: redisClient,
    host: 'localhost',
    port: 6379
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
