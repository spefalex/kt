// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var Andrana = require('./models/andrana');
var Utilisateurs = require('./models/Utilisateurs');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8082;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();   
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/keymada_db');            // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});



router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        var andra = new Andrana();      // create a new instance of the Bear model
        andra.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        andra.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });

    });
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/read')
    .get(function(req, res) {
        Utilisateurs.find(function(err, andrana) {
            res.header("Access-Control-Allow-Origin", "*");
            if (err)
            res.send(err);
            
            res.json(andrana);
          
        });
    });

    router.route('/testaa')
    .get(function(req, res) {
        const id =req.params.id;
        Utilisateurs.findOne({id:id}).exec((err, utilisateur) => {
          if (err) {
            res.send(400);
          } else {
            res.header("Access-Control-Allow-Origin", "*");
    
            var idFind= utilisateur;
            console.log(idFind)
           res.json(id);
    
    
    
          }
        });
    });
// GET message with id (using a GET at http://localhost:8080/messages/:message_id)
router.route('/findId/:id')
    .get(function(req, res) {


        Andrana.findById(req.params.id, function(err, andrana) {
            if (err)
                res.send(err);
            res.json(andrana);
        });
    });

    router.route('/update/:id')
    .put(function(req, res) {
        Andrana.findById(req.params.id, function(err, andrana) {
            if (err)
                res.send(err);
            // Update the message text
	    andrana.name= req.body.name;
            andrana.save(function(err) {
                if (err)
                    res.send(err);
                res.json({ message: 'successfully updated!' });
            });
 
        });
    })
    // Delete message with id (using a DELETE at http://localhost:8080/messages/:message_id)
    .delete(function(req, res) {
        Andrana.remove({
            _id: req.params.id
        }, function(err,andrana) {
            if (err)
                res.send(err);
 
            res.json({ message: 'Successfully deleted' });
        });
    });
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

