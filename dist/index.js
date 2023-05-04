"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;
var _q = require("q");
var _async = require("async");
var _underscore = require("underscore");
function map(myArray, iterator, limit) {
  var queue, promiseArray;
  limit = limit === undefined ? 1 : limit;
  queue = (0, _async.queue)(function (task, callback) {
    iterator(task.elem).then(function (result) {
      task.deferred.resolve(result);
      callback();
    }).fail(function (error) {
      task.deferred.reject(error);
      callback();
    });
  }, limit);
  promiseArray = (0, _underscore.map)(myArray, function (elem) {
    var deferred = (0, _q.defer)();
    queue.push({
      deferred: deferred,
      elem: elem
    });
    return deferred.promise;
  });
  return (0, _q.all)(promiseArray);
}