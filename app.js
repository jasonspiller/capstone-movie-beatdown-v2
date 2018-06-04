const express = require('express');
const path = require('path');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

// setup view engine
app.set('view engine', 'ejs');

// set public files directory
app.use(express.static(path.join(__dirname, 'public')));

// set routes
app.use('/auth', authRoutes);

// initial route
app.get('/',(req,res) => {
  res.render('index', {title: 'Home'})
})

// launch on port 3000
app.listen(3000, () => {
  console.log('Hello Dave.');
})
