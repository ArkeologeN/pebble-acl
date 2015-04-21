(function() {
  'use strict';

  var klass = require('klass');

  var Permissions = klass(function(adapter) {
    if (!adapter) {
      throw new Error('[adapter] is missing from Permissions constructor');
    }
    
    this._adapter = adapter;
  })
    .methods({
      /**
       *  Checks if user has access.
       * 
       * @abstract
       * @param {String} role name of the role
       * @param {String} entity Entity name to be checked for permissions over.
       * @param {String} method HTTP Verb to be checked for permission.
       * @param {Function} callback Callback function to be invoked later.
       */
      hasAccess: function(method, opts, callback) {
        if (!method) {
          return callback(new Error('[method] argument is required in hasAccess method.'));
        }
        
        if (!opts || typeof opts !== 'object') {
          return callback(new Error('[opts] requires to be an object'));
        }
        
        if (!opts.role || !opts.resource) {
          return callback(new Error('[opts.role] and [opts.resource] are required in hasAccess method.'));
        }
        
        if (typeof callback !== 'function') {
          throw new Error('[callback] is required in hasAccess method.');
        }
        
        
        this._adapter.exists({
          method: method,
          resource: opts.resource || '',
          role: opts.role || ''
        }, callback);
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
       * Retrieves all permissions by Role.
       * 
       * @param {Function} callback Fires onces done.
       */
      all: function(role, callback) {
        if (!role) {
          return callback(new Error('[role] is required in `all` method.'));
        }
        
        if (typeof callback !== 'function') {
          throw new Error('[callback] is required in `all` method.');
        }
        
        this._adapter.findOne(role, callback);
      },
      by: function(entity, callback) {

      }
    });

  module.exports = Permissions;

}());
