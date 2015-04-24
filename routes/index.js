var express = require('express');
var router = express.Router();

//Rest endpoints
var datasetRest = require('./dataset.js')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req,res, next) {
  var data = require('../mongoconnect').getData();
  data.find().toArray(function(err, results){
    res.json(results);
  });
});

//Link methods to router
datasetRest(router)

module.exports = router;
