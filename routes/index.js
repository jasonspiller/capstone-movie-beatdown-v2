const express = require('express');
const router = express.Router();
const authRoutes = require('./auth-routes');
const profileRoutes = require('./profile-routes');
const	controller = require('../controllers');


// set auth and profile routes
router.use('/auth', authRoutes);
router.use('/profile', profileRoutes);



// home page
router.get('/', controller.home);

// save game
router.post('/game/save', controller.saveGame);


// // get all games
// router.get('/games', controller.getGames);
//
// // update game page
// router.post('/games/update', controller.updateGamePage);
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