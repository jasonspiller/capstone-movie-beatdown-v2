const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();


// setup view engine
app.set('view engine', 'ejs');


// create cookie
app.use(cookieSession({
  // set age to one day
  maxAge: 24 * 60 * 60 * 1000,
  // encrypt cookie
  keys: [keys.session.cookieKey]
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('Connected to DB.');
})


// set public files directory
app.use(express.static(path.join(__dirname, 'public')));


// set routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// initial route
app.get('/',(req,res) => {
  res.render('index', {title: 'Home'})
})


// launch on port 3000
app.listen(3000, () => {
  console.log('Hello Dave.');
})
