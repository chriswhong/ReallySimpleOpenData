//insert data.json from Baltimore city into the database




var mongoose = require('mongoose');
var config = require('config');
// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);



};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);


require('./app/models/dataset.js')
var Dataset = mongoose.model('Dataset');

var data = require('./notes/baltimore.json')

data.forEach(function(datasetjson) {
  console.log(datasetjson);
  datasetjson.user = mongoose.Types.ObjectId('565e73de8b76015f0c73ff4f');
  var dataset = new Dataset(datasetjson);
  dataset.uploadAndSave(function(err){
    console.log(err);
  });
})

// Dataset.collection.insertMany(data, function(err,r) {
//   console.log(r);
// });