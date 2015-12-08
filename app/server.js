// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var User = require('./models/user');

var uri = 'mongodb://localhost:27017/locatioServer'


mongoose.connect(uri);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req,res,next)
{
	console.log('log : request made');
	next()
});
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	console.log("gettin /")
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/users')

    // create a bear (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) {
    	
        var user = new User();      // create a new instance of the Bear model
        user.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        user.save(function(err) {
        	if (err)
        		res.send(err);

        	res.json({ message: 'user created!' });
        });


 });

router.route('/users')  
	.get(function(req, res) {
	
        User.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

router.route('/users/:user_id')
    .get(function(req, res) {
    		
        User.findById(req.params.user_id, function(err, users) {
            if (err)
                res.send(err);
            
            res.json(users);
        });
    });

router.route('/users/:user_id')
.put(function(req, res) {
	console.log("c11"); 
        // use our bear model to find the bear we want
        User.findById(req.params.user_id, function(err, user) {
        	console.log("c12");
            if (err)
                res.send(err);
 			console.log("c13");
            user.name = req.body.name;  // update the bears info
            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);
                console.log("c14");
                res.json({ message: 'user updated!' });
            });
        });
    });


router.route('/users/:user_id')
  .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);