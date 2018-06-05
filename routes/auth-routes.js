const router = require('express').Router();
const passport = require('passport');

// auth sign in
router.get('/signin', (req, res) => {
  res.render('signin', {title: 'Sign In', user: req.user});
});

// auth sign out
router.get('/signout', (req, res) => {
  // handle with passport
  req.logout();
  res.redirect('/');
});

// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

// callback route for google to redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile/');
})

// auth with facebook
router.get('/facebook', passport.authenticate('facebook', {
  scope: 'public_profile'
}));

// callback route for facebook to redirect
router.get('/google/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile/');
})

module.exports = router;
