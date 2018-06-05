const router = require('express').Router();

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if not logged in forward to sign in
    res.redirect('/auth/signin')
  } else {
    // if logged in
    next();
  }
};

router.get('/', authCheck, (req, res) => {

  let data = {
    title: req.user.username + '\'s Profile',
    user: req.user
  }
  res.render('profile', data);
});

module.exports = router;
