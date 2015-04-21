(function() {
  'use strict';
  
  var Adapter = require('../adapter'),
      Redis   = require('redis'),
      Q       = require('q');
  
  var RedisAdapter = Adapter.extend(function() {
      // Prepare connector.
      this._prepare();
      this._keys = {
        prefix: 'pebble-acl',
        roles: 'pebble-acl:roles',
        resources: 'pebble-acl:resources'
      };
  })
    .methods({
        _prepare: function() {
            this._connector = Redis.createClient(this._opts || {});
        },
        findOne: function findOne(key, type) {
          return Q.Promise(function(resolve, reject) {
            // FIXME: Work someday, here!
          }.bind(this));
        },
        insert: function(doc, callback) {
          // if `doc` is string, means role.
          if (typeof doc === 'string') {
            // Push to lists.
            return this._connector.rpush(this._keys.roles, doc, callback);
          }
          
           // build resources, only
          if (doc instanceof Array) {
            doc = [].concat(doc);
            var multi = this._connector.multi();
            for (var j = 0; j < doc.length; j++) {
              var entity = doc[j];
              multi.rpush(this._keys.resources, entity);
            }
            return multi.exec(callback);
          }
          
          
          // Its an object, means build relationships.
          if (doc.role && doc.resources) {
            
            // Build multi-executor.
            return this._connector.hmset(
              this._keys.roles + ':' + doc.role,
              doc.resources,
              callback
            );
          }
          
        },
        exists: function(doc, callback) {
          if ('string' === typeof doc) {
            // Check if role exists.
          }
          
          if (doc.method && doc.resource && doc.role) {
            // Check for permissions against nested.
            this._connector.hget(
              this._keys.roles + ':' + doc.role, // Hash name.
              doc.resource, // Key to pick. 
              function(err, ok) {
                if (err)
                  return callback(err);
                  
                // Parse and check for permissions.
                // PS: Replace linear lookup with binary, someday!
                return callback(null, ok.split(',').indexOf(doc.method) > -1);
              });
          }
        },
        reset: function (callback) {
          var self = this;
          this._connector.keys(this._keys.prefix + '*', function(err, keys) {
            if (err) {
              return callback(err);
            }
            
            var multi = self._connector.multi();
            for (var i = 0; i < keys.length; i++) {
              multi.del(keys[i]);
            }
            
            return multi.exec(callback);
          });
        }
        
    });
  
  
  module.exports = RedisAdapter;
  
}());