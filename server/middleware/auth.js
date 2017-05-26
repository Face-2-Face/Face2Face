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
    client: redisClient,
    host: 'redis://h:pdc54228c4d9ceb0ac8771a7dab1571cd5d782b695be019cec5569f7e4fa097ae@ec2-34-197-198-120.compute-1.amazonaws.com:31229',
    port: 6379,
    // url: 'redis://h:pdc54228c4d9ceb0ac8771a7dab1571cd5d782b695be019cec5569f7e4fa097ae@ec2-34-197-198-120.compute-1.amazonaws.com:31229'
  }),
  secret: 'more laughter, more love, more life',
  resave: false,
  saveUninitialized: false
});
