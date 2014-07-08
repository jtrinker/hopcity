//  load packages and allow us to use them
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beer = require('./models/beer');

// connect to MongoDB
mongoose.createConnection('mongodb://jtrinker:Gretchen8@novus.modulusmongo.net:27017/ehiqyT6a');

// create our express application
var app = express();

// use bodyParser in our application
app.use(bodyParser());

// define our server port
var port = process.env.PORT || 3000;

// create our Router. Our Router is an isolated instance of middleware and routes.
// our application will "use()" our Router
var router = express.Router();

// initial dummy route for testing, will return json string
// http://localhost:3000/api
router.get('/', function(req, res) {
	res.json({ message: 'You are running low on beer!' });
});

// register all our routes with /api
// all defined routes will be prefixed with '/api'
app.use('/api', router);

// start the server
app.listen(port);


