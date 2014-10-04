'use strict';

angular
    .module('lmControllers')
    .controller('posts', function($rootScope, $scope, Articles, Analytics) {
        $rootScope.title = 'Posts — LilyMandarin';
        Analytics.page();

        $rootScope.tab = 'posts';

        $scope.load = function() {
            Articles.load({categories: 'post', count: 20}, $scope);
        };

        $scope.load();
    });
