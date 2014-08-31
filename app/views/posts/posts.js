'use strict';

angular
    .module('lmControllers')
    .controller('posts',
        function($rootScope, $scope, Article, Analytics, Admin) {
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
                if (!length) {
                    // First load
                    params.validatedBefore = '0';
                    params.validatedOnly = !Admin;
                } else {
                    // Subsequent loads
                    params.validatedBefore = $scope.posts[length - 1].firstValidationTimeNano;
                    params.validatedOnly = true;
                }

                Article.query(params, function(posts) {
                    // This is efficient because Angular will not recreate DOM elements for the
                    // already-appended posts in $scope.posts
                    $scope.posts = $scope.posts.concat(posts);

                    if (posts.length < params.count ||
                        posts.length && !posts[posts.length - 1].validated) {
                        $scope.loadStatus = 'ended';
                    } else {
                        $scope.loadStatus = 'ready';
                    }
                });
            };

            $scope.load();
        }
    );
