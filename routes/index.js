const express = require('express');
const router = express.Router();
const authRoutes = require('./auth-routes');
//const profileRoutes = require('./profile-routes');
const	controller = require('../controllers');

// set auth and profile routes
router.use('/auth', authRoutes);
//


const authCheck = (req, res, next) => {
  if(!req.user) {
    // if not logged in forward to sign in
    res.redirect('/auth/signin')
  } else {
    // if logged in
    next();
  }
};


// home page
router.get('/', controller.home);

// profile Page
router.get('/profile', authCheck, controller.profile)

// game
router.get('/game', authCheck, controller.game);

// save game
router.post('/game/save', authCheck, controller.saveGame);

// update game page
router.post('/game/update', authCheck, controller.updateGame);

// delete game
router.post('/game/delete', authCheck, controller.deleteGame);




// catch all 404
router.get('*', controller.fourzerofour);


module.exports = router;
