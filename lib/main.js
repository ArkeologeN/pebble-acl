(function() {
  'use strict';

  module.exports = {
    Permissions: require('./permissions'),
    Builder: require('./builder'),
    Adapter: {
      Redis: require('./adapters/redis')
    }
  };

}());
