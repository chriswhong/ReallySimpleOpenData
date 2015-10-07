var express = require('express');
var router = express.Router({mergeParams: true});
var low = require('lowdb');
var db = low('db.json');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//Rest endpoints
//var datasetRest = require('./dataset.js')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', function(req, res, next){
//   console.log('in router',req.params);
//   res.sendFile('/views/index.html', {'root': './'});
// });


//endpoint for full data catalog  
router.get('/data.json', function(req,res, next) {
  var data = require('../mongoconnect').getData();
  data.find({domain: req.params.domain},{dataset:1, _id:0}).toArray(function(err, results){
    res.json(results[0].dataset);
  });





  // var data = db('dataset').value();
  // res.json(data);
});

//from http://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
router.post('/login',
  passport.authenticate('local'), 
  function(req, res) {

    // Generate a JSON response reflecting authentication status
    if (!req.user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    return res.send({ success : true, message : 'authentication succeeded' });
  });

router.get('/logout', function(req, res) {
  req.logout();
  res.send({ success : true, message : 'user logged out' });
});


/* GET Home Page */
router.get('/loggedin', function(req, res){
  if (!req.user) {
      return res.send({ success : false, message : 'user not logged in' });
    }
    return res.send({ success : true, message : 'user logged in' });
});

module.exports = router;
