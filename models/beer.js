// load required packages
var mongoose = require('mongoose');

// beer schema -- maps to mongodb collection
var BeerSchema = new mongoose.schema({
  name: string,
  brewery: string,
  type: string,
  abv: string,
  limited: boolean,
  seasonal: boolean,
  local: boolean,
  runningLow: boolean
});

// export the mongoose model for use in our app
module.exports = mongoose.model('Beer', BeerSchema);