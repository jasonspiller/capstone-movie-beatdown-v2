const express = require('express');
const app = express();
const path = require('path');

// setup view engine
app.set('view engine', 'ejs');

// set public files directory
app.use(express.static(path.join(__dirname, 'public')));

// initial route
app.get('/',(req,res) => {
  res.render('index', {title: 'Home'})
})

// launch on port 3000
app.listen(3000, () => {
  console.log('Hello Dave.');
})
