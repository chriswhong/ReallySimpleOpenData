
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
var Dataset = mongoose.model('Dataset')
var utils = require('../../lib/utils')
var extend = require('util')._extend

/**
 * Load
 */

exports.load = function (req, res, next, id){
  var User = mongoose.model('User'); 

  Dataset.load(id, function (err, dataset) {
    if (err) return next(err);
    if (!dataset) return next(new Error('not found'));
    req.dataset = dataset;
    next();
  });
};

/**
 * List
 */

exports.index = function (req, res){
  console.log('tags',req.query.tags);
  var page = (req.query.page > 0 ? req.query.page : 1) - 1;
  var perPage = 30;
  var q = req.query.q;
  var sort = req.query.sort;
  var tags = req.query.tags;
  if (typeof tags == 'string') {
    tags = [tags];
  }
  var options = {
    perPage: perPage,
    page: page,
    criteria: q,
    sort: sort,
    tags: tags
  };
  console.log(options);
  
  //set up group by
  var agg = [
    {$unwind: "$keyword" },
    {$group: {
      _id: "$keyword",
      count: {$sum: 1}
    }},
    {$sort: { count: -1 } },
    {$limit: 15}
  ];

  

  Dataset.list(options, function (err, datasets) {
    // console.log('List found ',datasets.length)
    if (err) return res.render('500');
    Dataset.count1(options, function (err, count) {
  

      Dataset.aggregate(agg, function(err, tagCounts){
        console.log(tags);
        res.render('datasets/index', {
          datasets: datasets,
          page: page + 1,
          pages: Math.ceil(count / perPage),
          count: count,
          q: q,
          tags: tags,
          tagCounts: tagCounts,
          sort: sort
        });
      });
      
    });
  });
};

/**
 * New dataset
 */

exports.new = function (req, res){
  res.render('datasets/new', {
    title: 'New Dataset',
    dataset: new Dataset({})
  });
};

/**
 * Create a dataset
 */

exports.create = function (req, res) {
  var dataset = new Dataset(req.body);
 
  dataset.user = req.user;
  dataset.uploadAndSave(function (err) {
    if (!err) {
      req.flash('success', 'Successfully created dataset!');
      return res.redirect('/datasets/'+dataset._id);
    }
    res.render('datasets/new', {
      title: 'New Dataset',
      dataset: dataset,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Edit a dataset
 */

exports.edit = function (req, res) {
  res.render('datasets/edit', {
    dataset: req.dataset
  });
};

/**
 * Update dataset
 */

exports.update = function (req, res){
  var dataset = req.dataset;

  console.log(req.body);

  // make sure no one changes the user
  delete req.body.user;
  dataset = extend(dataset, req.body);

  dataset.uploadAndSave(function (err) {
    if (!err) {
      return res.redirect('/datasets/' + dataset._id);
    }

    res.render('datasets/edit', {
      title: 'Edit Dataset',
      dataset: dataset,
      errors: utils.errors(err.errors || err)
    });
  });
};

/**
 * Show
 */

exports.show = function (req, res){
  res.render('datasets/show', {
    title: req.dataset.title,
    dataset: req.dataset
  });
};

/**
 * Delete a dataset
 */

exports.destroy = function (req, res){
  var dataset = req.dataset;
  dataset.remove(function (err){
    req.flash('info', 'Deleted successfully');
    res.redirect('/datasets');
  });
};
