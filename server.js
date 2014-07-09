//  load packages and allow us to use them
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Beer = require('./models/beer');

// connect to MongoDB
mongoose.connect('mongodb://jtrinker:Gretchen8@novus.modulusmongo.net:27017/ehiqyT6a');

// create our express application
var app = express();

// use bodyParser in our application
// app.use(bodyParser()); is deprectaed -- this is the fix
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json())

// define our server port
var port = process.env.PORT || 3000;

// create our Router. Our Router is an isolated instance of middleware and routes.
// our application will "use()" our Router
var router = express.Router();

// initial dummy route for testing, will return json string
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({ message: 'Welcome to HopCity!' });
});

// create a new route with the prefix /beers
var beersRoute = router.route('/beers');

// new route for /beers/:beer_id
var beerRoute = router.route('/beers/:beer_id');

// create endpoint /api/beers for POSTS
beersRoute.post(function(req, res) {
	// create new instance of beer model
	var beer = new Beer();
	// set beer properties
	// req.body holds parameters that are sent up from the client as part of a POST request.
	beer.name =       req.body.name;
	beer.brewery =    req.body.brewery;
	beer.type =       req.body.type;
	beer.abv =        req.body.abv;
	beer.limited =    req.body.limited;
	beer.seasonal =   req.body.seasonal;
	beer.local =      req.body.local;
	beer.runningLow = req.body.runningLow;

	// save (mongoose function) the beer and check for errors
	beer.save(function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Beer added!', data: beer });
	});
});

// /api/beers GET
beersRoute.get(function(req, res) {
	// find all beers
	Beer.find(function(err, beers) {
		if (err)
			res.send(err);

		res.json(beers);
	});
});

// /api/beers/:beer_id GET -- single object
beerRoute.get(function(req, res) {
	// find a specific beer via mongoose 'findById'
	Beer.findById(req.params.beer_id, function(err, beer) {
		if (err)
			res.send(err)

		res.json(beer);
	});
});

// update single object
beerRoute.put(function(req, res) {
	// find beer to update
	Beer.findById(req.params.beer_id, function(err, beer) {
		// update existing beer
		beer.name =       req.body.name;
		beer.brewery =    req.body.brewery;
		beer.type =       req.body.type;
		beer.abv =        req.body.abv;
		beer.limited =    req.body.limited;
		beer.seasonal =   req.body.seasonal;
		beer.local =      req.body.local;
		beer.runningLow = req.body.runningLow;

		// save changes
		beer.save(function(err) {
			if (err)
				res.send(err);

			res.json(beer);
		});
	});
});

// delete an object
beerRoute.delete(function(req, res) {
	// find beer and delete -- findByIdAndRemove = mongoose
	Beer.findByIdAndRemove(req.params.beer_id, function(err) {
		if (err)
			res.send(err);

		res.json({ message: 'Beer deleted.' });
	});
});


// register all our routes with /api
// all defined routes will be prefixed with '/api'
app.use('/api', router);

// start the server
app.listen(port);


