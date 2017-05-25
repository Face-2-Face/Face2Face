const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('redis').createClient();

module.exports.verify = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports.session = session({
  store: new RedisStore({
    url: process.env.REDIS_URL
  }),
  secret: 'more laughter, more love, more life',
  resave: true,
  saveUninitialized: true
});
