var mongoose = require('mongoose');
// var mongoosePaginate = require('mongoose-paginate');

var artistSchema = new mongoose.Schema({
  name: String,
  mbid: String,
  img: String,
  info: String,
  genres: [],
  popuarity: Number
});

// artistSchema.plugin(mongoosePaginate);
const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
