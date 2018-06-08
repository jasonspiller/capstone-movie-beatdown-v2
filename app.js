const express = require('express');
const path = require('path');
const bodyParser 	= require('body-parser');
const router = require('./routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const dotenv 	= require('dotenv').config();
const cookieSession = require('cookie-session');
const passport = require('passport');

const app = express();


// setup view engine
app.set('view engine', 'ejs');

// add body-parser and set large file limits
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb'}));


// create cookie
app.use(cookieSession({
  // set age to one day
  maxAge: 7 * 24 * 60 * 60 * 1000,
  // encrypt cookie
  keys: [process.env.cookieKey]
}));


// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(process.env.dbURI, () => {
  console.log('Connected to DB.');
})


// set public files directory
app.use(express.static(path.join(__dirname, 'public')));


// set routes
app.use('/', router);

// port assignment
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
	console.log('Hello Dave.')
})
