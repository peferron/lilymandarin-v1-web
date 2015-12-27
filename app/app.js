'use strict';

angular.module('lmControllers', []);
angular.module('lmDirectives', []);
angular.module('lmFilters', []);
angular.module('lmServices', ['ngResource']);

angular
    .module('lm', [
        'ngRoute',
        'lmFilters',
        'lmDirectives',
        'lmControllers',
        'lmServices'
    ])
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://www.youtube.com/embed/**',
            'https://www.youtube.com/embed/**',
            'http://player.youku.com/embed/**',
            'https://player.youku.com/embed/**'
        ]);
    })
    .run(function($rootScope, ClickTap, Alert) {
        // Hide the current alert and error at each route change.
        $rootScope.$on('$routeChangeStart', function() {
            Alert.hide();
            $rootScope.error = null;
        });
    });

// Fastclick

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);
