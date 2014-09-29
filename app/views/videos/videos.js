'use strict';

angular
    .module('lmControllers')
    .controller('videos',
        function($rootScope, $scope, Articles, Analytics) {
            $rootScope.title = 'Videos — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'videos';

            var params = {categories: 'music|movie', count: 20};

            $scope.load = function() {
                Articles.load(params, $scope);
            };

            $scope.load();
        }
    );
