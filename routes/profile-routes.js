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
  console.log(req.user);
  res.send('You are logged in as: ' + req.user.username);
});

module.exports = router;
