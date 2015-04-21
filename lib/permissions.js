(function() {
  'use strict';

  var klass = require('klass');

  var Permissions = klass(function() {
  })
    .methods({
      /**
       *  Checks if user has access.
       * 
       * @abstract
       * @param {String} entity Entity name to be checked for permissions over.
       * @param {String} method HTTP Verb to be checked for permission.
       * @param {Function} callback Callback function to be invoked later.
       */
      hasAccess: function(entity, method, callback) {

      },
      /**
       * 
       * Check if user is logged in.
       * 
       */
      isLogin: function() {

      },
      /**
       * 
       * Retrieves all permissions.
       * 
       * @param {Function} callback Fires onces done.
       */
      all: function(callback) {

      },
      by: function(entity, callback) {

      }
    });

  module.exports = Permissions;

}());
