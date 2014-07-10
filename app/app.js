'use strict';

angular.module('lwControllers', []);
angular.module('lwDirectives', []);
angular.module('lwFilters', []);
angular.module('lwServices', ['ngResource']);

angular
    .module('lw', [
        'ngRoute',
        'lwFilters',
        'lwDirectives',
        'lwControllers',
        'lwServices'
    ])
    .config(function($httpProvider) {
        $httpProvider.interceptors.push('Loading');
    })
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'http://media.lilymandarin.com/**',
            'https://media.lilymandarin.com/**',
            'http://www.youtube.com/embed/**',
            'https://www.youtube.com/embed/**',
            'http://player.youku.com/embed/**',
            'https://player.youku.com/embed/**'
        ]);
    })
    .run(function($rootScope, ClickTap, Alert, Modal) {
        // Hide the current alert and error at each route change
        $rootScope.$on('$routeChangeStart', function() {
            Alert.hide();
            $rootScope.error = null;
        });
    });

// Convenience functions for debugging

window.log = function() {
    window.console.log.apply(window.console, arguments);
};
window.warn = function() {
    window.console.warn.apply(window.console, arguments);
};
window.error = function() {
    window.console.error.apply(window.console, arguments);
};

// Fastclick

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);
