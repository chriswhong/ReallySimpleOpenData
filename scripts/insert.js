//insert data.json from Baltimore city into the database
//run with NODE_PATH environment variable: 
//NODE_PATH=../config:../app/controllers node insert.js 

//replace with a userID, this will assign a user to each dataset as it is written to the database
var userObjectId = '5660f876389c8c2e4bc8d651'; 

var mongoose = require('mongoose');
var config = require('config');
require('../app/models/dataset.js')
var Dataset = mongoose.model('Dataset');
var data = require('./baltimore.json') 

// Connect to mongodb
var connect = function () {
  var options = { server: { socketOptions: { keepAlive: 1 } } };
  mongoose.connect(config.db, options);
};

connect();

mongoose.connection.on('error', console.log);





data.forEach(function(datasetjson) {

  console.log('Writing dataset ' + datasetjson.title);
  datasetjson.user = mongoose.Types.ObjectId(userObjectId);
  var dataset = new Dataset(datasetjson);
  dataset.uploadAndSave();
  
})


mongoose.disconnect(function(err) {
  if (err) throw err;
  console.log('Disconnected from mongodb');
});

