const express = require('express');
const router = express.Router();
const authRoutes = require('./auth-routes');
const profileRoutes = require('./profile-routes');
const	controller = require('../controllers');

// set auth and profile routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);


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

// game
router.get('/game', authCheck, controller.game);

// save game
router.post('/game/save', controller.saveGame);

// update game page
router.post('/game/update', controller.updateGame);

// // get all games
// router.get('/games', controller.getGames);
//
// // update game call
// router.post('/game/update/:id', controller.updateGame);
//
// // delete game
// router.post('/games/delete', controller.deleteGame);
//
// // game results
// router.post('/results', controller.results);


// catch all 404
router.get('*', controller.fourzerofour);


module.exports = router;
