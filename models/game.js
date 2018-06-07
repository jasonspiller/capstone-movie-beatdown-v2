const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  movies: [],
	matches: [],
  current_match: Number,
  user_id: String
 });

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
