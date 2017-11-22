var mongoose = require('mongoose');

userSchema = new mongoose.Schema({
  username:       String,
  password:       String,
  searchHistory:  [],
  token:          String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
