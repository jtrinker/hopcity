//  load express and allow us to use it
var express = require('express');

// create our express application
var app = express();

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


