'use strict';

angular
    .module('lmControllers')
    .controller('post',
        function($rootScope, $scope, $routeParams, Article, Analytics, Domain, $location) {
            $rootScope.tab = 'posts';

            Article.get({id: $routeParams.id}, function(post) {
                // Enforce canonical path
                var path = '/post/' + post.id + '/' + post.slug;
                if ($location.path() !== path) {
                    $location.path(path).replace();
                    return;
                }

                $rootScope.title = post.title + ' — LilyMandarin';
                Analytics.page();

                $scope.socialUrl = Domain.origin + path;

                var line = post.lines[0];
                $scope.socialText = line['zh-CN'] + ' / ' + line['en-US'];

                $scope.post = post;
            });
        }
    );
