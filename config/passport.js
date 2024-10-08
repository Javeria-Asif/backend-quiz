const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User'); // Replace with your User model

module.exports = function(passport) {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!user.validPassword(password)) return done(null, false);
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};