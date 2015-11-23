
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
  title: {type: String, default : '', trim : true},
  description: {type: String, default : '', trim : true},
  keyword: {type: [], get: getTags, set: setTags},
  modified: {type : Date, default : Date.now},
  publisher: {type: String, default : '', trim : true},
  contactPoint: {
    fn: {type: String, default : '', trim : true},
    hasEmail: {type: String, default : '', trim : true}
  },
  identifier: {type: String, default : '', trim : true},
  accessLevel: {type: String, default : 'public', trim : true},
  landingPage: {type: String, default : '', trim : true},
  issued: {type : Date, default : Date.now},
  distribution: [{
    downloadURL: {type: String, default : '', trim : true},
    accessURL: {type: String, default : '', trim : true},
    mediaType: {type: String, default : '', trim : true},
    description: {type: String, default : '', trim : true},
    title: {type: String, default : '', trim : true}
  }],
  theme: [String]
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
      .populate('comments.user')
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
    var criteria = options.criteria || {}

    this.find(criteria)
      .populate('user', 'name username')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  }
}

mongoose.model('Dataset', DatasetSchema);
