(function() {
  'use strict';

  var klass = require('klass');

  var Builder = klass(function(adapter) {
    if (!adapter) {
      // FIXME: Check if instanceOf Adapter as well
      throw new Error('[adapter] is missing from `Builder` constructor');
    }
    
    this._adapter = adapter;
  })
    .methods({
      /**
       * Creates a role in database.
       * 
       * @param {String} role name of the role to create
       * @param {Funciton} callback Callback function to be invoked once done.
       */
      addRole: function(role, callback) {
        this._adapter.insert(role, callback);
      },
      /**
       * 
       * Adds entities against the role.
       * 
       * @param {String} role name of the role.
       * @param {Array} entities collection of entity names.
       * @param {Funcion} callback Fires once done.
       * 
       */
      addResources: function(entities, callback) {
        
        // if not entities, defined
        if (!entities instanceof Array) {
          return callback(new Error('[entities] should be an Array'));
        }
        
        // Invoke insert for adapter.
        this._adapter.insert(entities, callback);
      },
      /**
       * 
       * Adds a relationship between Roles & Resources.
       * 
       * @param {String} role name of the role.
       * @param {Object} resources collection of all allowed resources with allowed VERBS over values.
       * @param {Function} callback fires once done.
       * 
       */
      addResourcesToRoles: function(role, resources, callback) {
        if (!role) {
          return callback(new Error('[role] is missing from addResourcesToRoles method.'));
        }
        
        if (!resources instanceof Object) {
          return callback(new Error('[resources] are supposed to be an Object'));
        }
        
        if ('function' !== typeof callback) {
          return callback(new Error('[callback] is required in addResourcesToRoles method.'));
        }
        
        this._adapter.insert({
          role: role,
          resources: resources
        }, callback);
      },
      /**
       * 
       * Resets permissions database.
       * 
       * @param {Function} callback Fires once done.
       * 
       */
      clear: function(callback) {
        this._adapter.reset(callback);
      }
    });

  module.exports = Builder;

}());
