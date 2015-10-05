var express = require('express');
var router = express.Router();
var low = require('lowdb');
var db = low('db.json');

//Rest endpoints
var datasetRest = require('./dataset.js')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

//endpoint for full data catalog  
router.get('/data.json', function(req,res, next) {
  // var data = require('../mongoconnect').getData();
  // data.find().toArray(function(err, results){
  //   res.json(results);
  // });

  var data = db('dataset').value();
  res.json(data);
});

//Link methods to router
datasetRest(router)

module.exports = router;
