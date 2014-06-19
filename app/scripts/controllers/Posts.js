'use strict';

angular
    .module('lwControllers')
    .controller('Posts',
        function($rootScope, $scope, $routeParams, $location, Article, Analytics, Admin) {
            $rootScope.title = 'Posts — LilyMandarin';
            Analytics.page();
            
            $rootScope.tab = 'posts';

            $scope.posts = [];

            // Fetches and appends a new batch of posts
            $scope.load = function() {
                $scope.loadStatus = 'loading';

                var params = {
                    categories: 'post',
                    count: 20
                };

                var length = $scope.posts.length;
                if (length) {
                    params.validatedBefore = $scope.posts[length - 1].firstValidationTimeNano;
                    // Only get non-validated articles on the first load, otherwise they will end up
                    // duplicated!
                    params.validatedOnly = true;
                } else {
                    params.validatedBefore = '0';
                    params.validatedOnly = !Admin;
                }

                Article.query(params, function(posts) {
                    // This is efficient because Angular will not recreate DOM elements for the
                    // already-appended posts in $scope.posts
                    $scope.posts = $scope.posts.concat(posts);

                    $scope.loadStatus = posts.length < params.count ? 'ended' : 'ready';
                });
            };

            $scope.load();
        }
    );