'use strict';

angular
    .module('lmFilters')
    .filter('Plural', function() {
        // Eexamples:
        // - Plural(1, 'second') => '1 second'
        // - Plural(2, 'second') => '2 seconds'
        return function(value, unit) {
            if (typeof value !== 'number' || isNaN(value)) {
                return value;
            }
            if (!unit) {
                return value + '';
            }
            return value + ' ' + unit + (Math.abs(value) > 1 ? 's' : '');
        };
    });
