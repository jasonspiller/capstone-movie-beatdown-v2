const db = require('../models');
const request = require('request');


// home route
exports.home = (req,res) => {
  res.render('index', {title: 'Home', user: req.user})
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
// // save games
// exports.saveGame = function(req, res, next) {
//
// 	console.log(req.body);
//
// 	db.Game.create(req.body, function(err, result) {
// 		if(err){
// 			console.log("Index Error: " + err);
// 			res.sendStatus(500);
// 		}
//
// 		res.redirect('/games')
// 	});
// };
//
//
// // save new game
// exports.saveUserGame = function(req, res, next) {
//
// 	db.User.findOne({_id:req.session.userId}, function(err, user) {
// 		if(err){
// 			console.log("Index Error: " + err);
// 			res.sendStatus(500);
// 		}
//
// 		var newGame = new db.Game (req.body)
//
// 		console.log(newGame);
//
// 		user.games.push(req.body);
//
// 		console.log(user.games);
//
// 		user.save(function(err, updatedDocument){
// 			res.redirect('/user/games')
// 		})
// 	});
// };
//
//
// // update game page
// exports.updateGamePage = function(req, res, next) {
//
// 	var data = {
// 		title: 'Update Game',
// 		results: req.body
// 	}
// 	res.render('updateGame', data);
// };
//
//
// // update game
// exports.updateGame = function(req, res, next) {
//
// 	db.User.updateOne({_id: req.session.userId, 'games._id': req.body._id}, { $set: { "games.$.description":req.body.description, "games.$.gameString":req.body.gameString } }, function(err, result) {
//     if(err){
// 			console.log("Update Error: " + err);
// 			res.sendStatus(500);
//     }
//
// 		// go back to the game results page
// 		var strGoogleAPI 			= 'https://www.googleapis.com/customgame/v1',
// 				strGoogleAPIKey 	= process.env.GOOGLE_API_KEY,
// 				strGoogleGameID = '016727189182641024167:t9tcn00re6o',
// 				strGameString 	= req.body.gameString;
//
// 		// create Google API url
// 	 	var strGoogleAPIUrl = `${strGoogleAPI}?key=${strGoogleAPIKey}&cx=${strGoogleGameID}&q=${strGameString}`;
//
// 		// make request call
// 		request(encodeURI(strGoogleAPIUrl), { json: true }, (err, response, results) => {
// 		  if(err) {
// 				console.log("API Error" + err);
// 			}
//
// 			console.log(results);
//
// 			var data = {
// 				title: 'Gameed: ',
// 				results: results,
// 				_id: req.body._id,
// 				description: req.body.description,
// 				gameString: req.body.gameString,
// 				existing: true
// 			}
//
// 			res.render('results', data)
// 		});
// 	});
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
