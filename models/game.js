const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
	description: String,
	searchString: String
 });

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
