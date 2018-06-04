const passport = require('passport');
const googleStrategy = require('passport-google-oauth20')
const keys = require('./keys');
const User = require('../models/user');

passport.use(
  new googleStrategy({

    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {

    // check to see if user are already in the DB
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // user in DB
        console.log('Current user is: ' + currentUser);
      } else {
        // passport callback creates new user
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser);
        });
      }
    });
  })
)
