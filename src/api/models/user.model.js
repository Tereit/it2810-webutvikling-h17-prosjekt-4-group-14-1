var mongoose = require('mongoose');

userSchema = new mongoose.Schema({
  name:           String,
  searchHistory:  [],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
