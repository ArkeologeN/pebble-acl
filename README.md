# pebble-acl
Access Controller designed to be plugged on top of meanjs framework.

# Disclaimer

The module has been designed to be used across various applications. Primarily, its been written at `10Pearls, LLC` and the team at `10Pearls, LLC` will solely be overtaken for all the changes. Due to the reason, they are open to change, modify, deprecate or remove any feature / task / bug / functionality anytime based upon the sole discretion.

# Install

Simple as enough, 

```
$ npm install pebble-acl --save
```

# Usage

Initially, you have to populate your data source with Roles, Resources and HTTP verbs respectively. The adapters (currently, only `redis` is available) would take care of manipulation, referring to parent abstract adapter.

## Population.

```javascript
    var acl = require('pebble-acl'),
        Adapter = acl.Adapter.RedisAdapter,
        Builder = acl.Builder,
        async   = require('async');
        
    // initialize builder.
    var builder = new Builder(new Adapter({}));
    
    // add role.
    builder.addRole('admin', function() {
        // Role created.
    });
    
    // Multi addRole.
    async.parallel({
        godfather: function(callback) {
            builder.addRole('godfather', callback);
        },
        manager: function(callback) {
            builder.addRole('manager', callback);
        },
        user: function(callback) {
            builder.addRole('user', callback);
        },
        guest: function(callback) {
            builder.addRole('guest', callback);
        }
    }, function(err, ok) {
        // All roles are created.
        
        builder.addResources(['engineers', 'doctors', 'supermen'], function(err, ok) {
            // Resources created.
            
            builder.addResourcesToRoles('godfather', {
                engineers: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD'],
                doctors: ['GET', 'POST'],
                supermen: ['GET', 'HEAD']
            }, function(err, ok) {
                
                // You're completely populated now with ACL in application. Inorder to reset, do call `reset`.
                builder.clear(function() {
                    // Back to home!
                });
            });
        });
    });
```

## Permissions

You could use the Permissions API to check for access across entities.

```javascript
    var acl = require('pebble-acl'),
        Adapter = acl.Adapter.RedisAdapter,
        Permission = acl.Permissions;
        
    var permissions = new Permissions(new Adapter));    // You could pass the argument of {} to adapter.
    permissions.hasAccess('POST', {
        role: 'admin',
        resource: 'engineers'
    }, function(err, ok) {
        // ok === true
    });
    
    permissions.all('admin', function(err, access) {
        // access carries key as resource and values as allowed methods.
    });
```

# Contributors

- [Hamza Waqas](http://twitter.com/HamzaWaqas)
- [Azfar Ali](http://github.com/mideveloper)

# License

MIT