'use strict';

angular
    .module('lmControllers')
    .controller('videos',
        function($rootScope, $scope, Articles, Analytics) {
            $rootScope.title = 'Videos — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'videos';

            $scope.load = function() {
                Articles.load({categories: 'music|movie', count: 20}, $scope);
            };

            $scope.load();
        }
    );
