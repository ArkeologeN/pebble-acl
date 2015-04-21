(function() {
  'use strict';
  
  var klass = require("klass");
  
  var Adapter = klass(function(opts) {
      this._opts = opts;
  })
    .methods({
        insert: function insert(doc, callback) {
            // body...
        },
        update: function update(argument) {
            // body...
        },
        drop: function drop(argument) {
            // body...
        },
        findOne: function findOne(argument) {
            // body...
        },
        find: function find(argument) {
            // body...
        },
        /**
         * 
         * Prepares property for native wrappers.
         * 
         * @return  void
         * 
         */
        _prepare: function () {
            // body...
        },
        reset: function reset() {
            // body...
        }
    });
    
  
  module.exports = Adapter;
  
}());