const router = require('express').Router();
const passport = require('passport');

// auth sign in
router.get('/signin', (req, res) => {
  res.render('signin', {title: 'Sign In'});
});

// auth sign out
router.get('/signout', (req, res) => {
  // handle with passport
  res.send('Signing out.');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  console.log(req.user);
  res.redirect('/profile/');
})

module.exports = router;
