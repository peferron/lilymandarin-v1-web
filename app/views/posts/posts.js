'use strict';

angular
    .module('lmControllers')
    .controller('posts',
        function($rootScope, $scope, Articles, Analytics) {
            $rootScope.title = 'Posts — LilyMandarin';
            Analytics.page();

            $rootScope.tab = 'posts';

            var params = {categories: 'post', count: 20};

            $scope.load = function() {
                Articles.load(params, $scope);
            };

            $scope.load();
        }
    );
