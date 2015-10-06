var express = require('express');
var router = express.Router({mergeParams: true});
var low = require('lowdb');
var db = low('db.json');

//Rest endpoints
//var datasetRest = require('./dataset.js')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next){
  console.log('in router',req.params);
  res.sendFile('/views/index.html', {'root': './'});
});


//endpoint for full data catalog  
router.get('/data.json', function(req,res, next) {
  var data = require('../mongoconnect').getData();
  data.find({domain: req.params.domain},{dataset:1, _id:0}).toArray(function(err, results){
    res.json(results[0].dataset);
  });

  // var data = db('dataset').value();
  // res.json(data);
});



module.exports = router;
