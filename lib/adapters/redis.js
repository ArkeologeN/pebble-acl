(function() {
  'use strict';
  
  var Adapter = require('../adapter'),
      Redis   = require('redis');
  
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