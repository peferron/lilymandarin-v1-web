'use strict';

angular
    .module('lmServices')
    .factory('Cache', function($q, Admin) {
        return {
            request: function(config) {
                if (Admin && config.url.indexOf('/api') === 0) {
                    var prefix = config.url.indexOf('?') >= 0 ? '&' : '?';
                    var random = Math.floor(Math.random() * 10e10);
                    config.url += prefix + 'nocache=' + random;
                }
                return config || $q.when(config);
            },
        };
    });
