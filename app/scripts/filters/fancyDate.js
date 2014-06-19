'use strict';

angular
    .module('lwFilters')
    .filter('fancyDate', function($filter) {
        // Returns the ordinal suffix ('st', 'nd' or 'th') for the day of the given date.
        function getSuffix(date) {
            var d = date.getDate();
            switch (d) {
                case 1:
                case 21:
                case 31:
                    return 'st';
                case 2:
                case 22:
                    return 'nd';
                case 3:
                case 23:
                    return 'rd';
                default:
                    return 'th';
            }
        }

        // Converts a time expressed as a nanoseconds string to a pretty date.
        return function(time) {
            if (typeof time !== 'number' || isNaN(time)) {
                return time;
            }
            if (document.documentElement.lang === 'en-US') {
                var date = new Date(time);
                var ngDate = $filter('date');

                var str = ngDate(date, 'MMMM d, y');
                var suffix = getSuffix(date);

                return str.replace(',', suffix + ',');
            }
            // Unsupported language
            return time;
        };
    });