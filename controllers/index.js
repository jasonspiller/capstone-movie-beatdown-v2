const db = require('../models');
const request = require('request');



// home route
exports.home = (req, res) => {
  res.render('index', {title: 'Home', user: req.user})
};


// save game
exports.game = (req, res) => {

  data = {
    title: 'Battle!',
    user: req.user
  }

  res.render('game', data)
};


// save game
exports.saveGame = (req, res) => {

	//console.log(req.body);

	db.Game.create(req.body, function(err, result) {
		if(err){
			console.log("Index Error: " + err);
			res.sendStatus(500);
		}

	  res.sendStatus(200)
	});
};


// update game
exports.updateGame = function(req, res) {

  //console.log(req.body);

	db.Game.updateOne(
    {'user_id': req.body.user_id},
    { $set: {
      'movies': req.body.movies,
      'current_match': req.body.current_match
    }}, function(err, result) {
    if(err){
			console.log("Update Error: " + err);
			res.sendStatus(500);
    }
		res.sendStatus(200)
	});
};


// // get all user games
// exports.userGames = function(req, res, next) {
//
// 	// query the db
// 	db.User.findOne({_id: req.session.userId}, function (err, currentUser) {
// 		if (err) {
//       console.log('DB error: ' + err);
//       res.sendStatus(500);
//     }
// 		var data = {
// 			title: currentUser.name + '\'s Games',
// 			user: currentUser,
// 			results: currentUser.games
// 		}
//
// 		res.render('games', data);
//   });
// };
//
//
// // get all games
// exports.getGames = function(req, res, next) {
//
// 	// query the db
//   db.Game.find(function(err, games) {
//     if (err) {
//       console.log('DB error: ' + err);
//       res.sendStatus(500);
//     }
// 		var data = {
// 			title: 'Games',
// 			results: games
// 		}
// 		res.render('games', data);
//   });
// };
//
//
// // delete game
// exports.deleteGame = function(req, res, next) {
//
// 	db.User.update({_id:req.session.userId}, { $pull: {games: req.body} }, function(err, user) {
// 		if(err){
// 			console.log("Update Error: " + err);
// 			res.sendStatus(500);
// 		}
// 		res.redirect('/user/games')
// 	})
// };


// catch all 404
exports.fourzerofour = (req, res) => {
	res.render('404', {title: 'Page Not Found', user: req.user});
};
