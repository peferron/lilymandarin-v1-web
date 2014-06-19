'use strict';

angular
    .module('lwServices')
    .factory('Analytics', function($rootScope, $window, $log) {
        return {
            page: function() {
                if (!$window.ga) {
                    $log.warn('Analytics: ga not available.');
                    return;
                }
                $window.ga('send', 'pageview', $rootScope.title);
            }
        };
    });
