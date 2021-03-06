'use strict';

angular
    .module('lmFilters')
    .filter('Progress', function() {
        return function(progress) {
            if (progress < 0) {
                return 'Processing failed.';
            }

            if (progress < 100) {
                return 'Processing — ' + progress + '% done. Refresh page to update.';
            }

            return 'Processing done.';
        };
    });
