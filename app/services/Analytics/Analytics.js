'use strict';

angular
    .module('lmServices')
    .service('Analytics', function($rootScope, $window, $log) {
        this.page = function() {
            if (!$window.ga) {
                $log.warn('Analytics: ga not available.');
                return;
            }
            $window.ga('send', 'pageview', $rootScope.title);
        };
    });
