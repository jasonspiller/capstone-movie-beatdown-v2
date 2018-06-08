const db = require('../models');
const request = require('request');


// home route
exports.home = (req, res) => {
  res.render('index', {title: 'Home', user: req.user})
};


// profile Page
exports.profile = (req, res) => {

  console.log(req.user);

  // query the db
  db.Game.findOne({'user_id': req.user.id}, (err, game) => {
    if (err) {
      console.log('DB error: ' + err);
      res.sendStatus(500);
    }

    if(game) {
      console.log(game);
      let data = {
        title: req.user.username + '\'s Profile',
        user: req.user,
        game: game
      }
      res.render('profile', data);

    } else {
      console.log('no game');
      let data = {
        title: req.user.username + '\'s Profile',
        user: req.user
      }
      res.render('profile', data);

    }
  });

};


// game page
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
			console.log("Create Error: " + err);
			res.sendStatus(500);
		}

	  res.sendStatus(200)
	});
};


// update game
exports.updateGame = (req, res) => {

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


// delete game
exports.deleteGame = (req, res) => {

  console.log(req.body);

	db.Game.remove({'user_id': req.body.user_id}, function(err, game) {
		if(err){
			console.log("Delete Error: " + err);
			res.sendStatus(500);
		}
    console.log('Profile Test');
		res.sendStatus(200)
	});
};


// catch all 404
exports.fourzerofour = (req, res) => {
	res.render('404', {title: 'Page Not Found', user: req.user});
};
