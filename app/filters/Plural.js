'use strict';

angular
    .module('lwFilters')
    .filter('Plural', function() {
        // E.g. Plural(1, 'second') => '1 second', Plural(2, 'second') => '2 seconds'
        return function(value, unit) {
            if (typeof value !== 'number' || isNaN(value)) {
                return value;
            }
            if (!unit) {
                return value + '';
            }
            if (document.documentElement.lang === 'en-US') {
                return value + ' ' + unit + (Math.abs(value) > 1 ? 's' : '');
            }
            // Unsupported language
            return value;
        };
    });
