const passport = require('passport');
const googleStrategy = require('passport-google-oauth20')
const facebookStrategy = require('passport-facebook')
const dotenv 	= require('dotenv').config();
const User = require('../models/user');

// set the user id in the cookie
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// find the user based on the id from the cookie
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});


passport.use(
  new googleStrategy({

    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.googleClientID,
    clientSecret: process.env.googleClientSecret
  }, (accessToken, refreshToken, profile, done) => {

    // check to see if user are already in the DB
    User.findOne({authId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // user in DB
        console.log('Current user is: ' + currentUser);
        done(null, currentUser);
      } else {
        // passport callback creates new user
        new User({
          username: profile.displayName,
          authId: profile.id,
          image: profile._json.image.url
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser);
          done(null, newUser);
        });
      }
    });
  })
)


passport.use(
  new facebookStrategy({

    // options for the google strategy
    callbackURL: '/auth/facebook/redirect',
    clientID: process.env.facebookAppID,
    clientSecret: process.env.facebookAppSecret
  }, (accessToken, refreshToken, profile, done) => {

    console.log(profile);

    // check to see if user are already in the DB
    User.findOne({authId: profile.id}).then((currentUser) => {
      if(currentUser) {
        // user in DB
        console.log('Current user is: ' + currentUser);
        done(null, currentUser);
      } else {
        // passport callback creates new user
        new User({
          username: profile.displayName,
          authId: profile.id,
          image: profile._json.image.url
        }).save().then((newUser) => {
          console.log('New user created: ' + newUser);
          done(null, newUser);
        });
      }
    });
  })
)
