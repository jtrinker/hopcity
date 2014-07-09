// load required packages
var mongoose = require('mongoose');

// beer schema -- maps to mongodb collection
var BeerSchema = new mongoose.Schema({
  name: String,
  brewery: String,
  type: String,
  abv: String,
  limited: Boolean,
  seasonal: Boolean,
  local: Boolean,
  runningLow: Boolean
});

// export the mongoose model for use in our app
module.exports = mongoose.model('Beer', BeerSchema);