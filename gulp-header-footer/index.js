'use strict';

const fs = require('fs')
const es = require('event-stream')
const gutil = require('gulp-util')
const PluginError = gutil.PluginError

/**
 * gulp-header-footer
 */

module.exports = exports = (source, option) => {

  if(!source) throw error('Source files are not available')
  if(!option) option = {header: '', footer: ''}

  if(typeof source.on === 'function' && typeof source.pipe === 'function') {
    return handleVinylStream(source, option)
  } else {
    throw error('Source files are not available: please pass a vinyl file stream')
  }

}

const error = (message) => {
  return new PluginError('gulp-header-footer', message);
}

function handleVinylStream (sources, option) {
  var collected = collectFilesToInject(sources, option);

  return es.map(function (target, cb) {
    if (target.isStream()) {
      return cb(error('Streams not supported for target templates!'));
    }
    collected(function (collection) {
      target.contents = replaceHeaderFooter(target, collection, option);
      cb(null, target);
    });
  });
}

function replaceHeaderFooter(target, collection, option) {
  var contents = option.header + target.contents + option.footer;
  return new Buffer(contents);
}

function collectFilesToInject (sources, option) {
  var collection = [], done = false, queue = [];

  sources.pipe(es.through(collector(collection, option), function () {
    done = true;
    while (queue.length) {
      resolve(queue.shift());
    }
  }));

  function resolve (cb) {
    setImmediate(function () {
      cb(collection);
    });
  }

  return function (cb) {
    if (done) {
      resolve(cb);
    } else {
      queue.push(cb);
    }
  };
}

/**
 * Create a file collecting function
 * to be used in es.through
 *
 * @param {Array} collection  Collection to fill with files
 * @param {Object} opt
 * @returns {Function}
 */
function collector (collection, opt) {
  return function (file) {
    if (!file.path) {
      return;
    }

    collection.push(file);
  };
}