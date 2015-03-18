var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;


var mongoClient = new MongoClient(new Server('localhost', 27017));
var data;

mongoClient.open(function(err, mongoClient) {
  var db = mongoClient.db('rsod');
  data = db.collection('baltimore');
});

module.exports = {
  getData: function() { return data; }
};