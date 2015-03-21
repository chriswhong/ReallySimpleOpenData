var MongoClient = require('mongodb').MongoClient;

// var Server = require('mongodb').Server;




//var mongoClient = new MongoClient(new Server('localhost', 27017));

var data;

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/rsod';

MongoClient.connect(mongoUri, function(err, db) {
  //var db = mongoClient.db('rsod');
  data = db.collection('baltimore');
});

module.exports = {
  getData: function() { return data; }
};