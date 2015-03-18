var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data.json', function(req,res, next) {
  var data = require('../mongoconnect').getData();
  data.find().toArray(function(err, results){
    res.json(results);
  });
});

module.exports = router;
