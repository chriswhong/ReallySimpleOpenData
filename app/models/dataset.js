
/**
 * Module dependencies.
 */

var mongoose = require('mongoose');
var Imager = require('imager');
var config = require('config');

var imagerConfig = require(config.root + '/config/imager.js');
var utils = require('../../lib/utils');

var Schema = mongoose.Schema;

/**
 * Getters
 */

var getTags = function (tags) {
  return tags.join(',');
};

/**
 * Setters
 */

var setTags = function (tags) {
  return tags.split(',');
};

/**
 * Dataset Schema
 */

var DatasetSchema = new Schema({
  user: {type : Schema.ObjectId, ref : 'User'},
  title: {type: String, default : '', trim : true, index: true},
  description: {type: String, default : '', trim : true, index: true},
  //keyword: {type: [], set: setTags},
  keyword: [{type: String, default : '', trim : true}],
  modified: {type : Date, default : Date.now},
  publisher: {
    name: {type: String, default : '', trim : true}
  },
  contactPoint: {
    fn: {type: String, default : '', trim : true},
    hasEmail: {type: String, default : '', trim : true}
  },
  identifier: {type: String, default : '', trim : true},
  accessLevel: {type: String, default : 'public', trim : true},
  landingPage: {type: String, default : '', trim : true},
  issued: {type : Date, default : Date.now},
  distribution: [{
    name: {type: String, default : '', trim : true},
    description: {type: String, default : '', trim : true},
    downloadURL: {type: String, default : '', trim : true},
    accessURL: {type: String, default : '', trim : true},
    mediaType: {type: String, default : '', trim : true}
  }],
  theme: [{type: String, default : '', trim : true}]
});

/**
 * Validations
 */

DatasetSchema.path('title').required(true, 'Title cannot be blank');
DatasetSchema.path('description').required(true, 'Description cannot be blank');


/**
 * Methods
 */

DatasetSchema.methods = {

  /**
   * Save article and upload image
   *
   * @param {Object} images
   * @param {Function} cb
   * @api private
   */

  uploadAndSave: function (cb) {
    return this.save(cb)
  }

}

/**
 * Statics
 */

DatasetSchema.statics = {

  /**
   * Find dataset by id
   *
   * @param {ObjectId} id
   * @param {Function} cb
   * @api private
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('user', 'name email username')
      //.populate('comments.user')
      .exec(cb);
  },

  /**
   * List datasets
   *
   * @param {Object} options
   * @param {Function} cb
   * @api private
   */

  list: function (options, cb) {
    var criteria = options.criteria || {};
    var tags = options.tags;

    console.log(criteria);
    var regex = new RegExp(criteria, 'i');
    var regex1 = new RegExp(tags,'i');
    console.log(regex);
    var query = this.find();

    if(tags) {
      query.where('keyword').in(tags)
    }
    
    query
      .or([{ 'title': { $regex: regex }}, { 'description': { $regex: regex }},{ 'keyword': { $regex: regex }}])
      .populate('user', 'name username')
      .sort(parseSort(options.sort)) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);

    function parseSort(sort) {
      
      switch(sort) {
          case 'titleAsc':
              return {'title':1}
              break;
          case 'titleDesc':
              return {'title':-1}
              break;
          case 'lastModified':
              return {'modified':-1}
              break;

          default:
              return {'title':1}
      }

      return sort;
    }
  },

  count1: function (options, cb) {
    var criteria = options.criteria || {};
    var tags = options.tags;

    console.log(criteria);
    var regex = new RegExp(criteria, 'i');
    var regex1 = new RegExp(tags,'i');
    console.log(regex);
    var query = this.count();

    if(tags) {
      query.where('keyword').in(tags)
    }
      query.or([{ 'title': { $regex: regex }}, { 'description': { $regex: regex }},{ 'keyword': { $regex: regex }}])
      .exec(cb);
  }
}

mongoose.model('Dataset', DatasetSchema);
