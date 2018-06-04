const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  authId: String
});

// mongo will pluralize 'user'
const User = mongoose.model('user', userSchema);

module.exports = User;
