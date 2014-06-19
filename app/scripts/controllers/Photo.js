'use strict';

angular
    .module('lwControllers')
    .controller('Photo',
        function($rootScope, $scope, $routeParams, Article, Analytics, Domain, $location) {
            $rootScope.tab = 'photos';

            Article.get({id: $routeParams.id}, function(photo) {
                // Enforce canonical path
                var path = '/photo/' + photo.id + '/' + photo.slug;
                if ($location.path() !== path) {
                    $location.path(path).replace();
                    return;
                }

                $rootScope.title = photo.title + ' — LilyMandarin';
                Analytics.page();

                $scope.socialUrl= Domain.origin + path;

                var line = photo.lines[0];
                $scope.socialText = line['zh-CN'] + ' / ' + line['en-US'];

                $scope.photo = photo;

                var media = photo.internal.medias['main-photo'];
                $scope.photoHeight = media ? media.height : 100;
                $scope.photoWidth = media ? media.width : 100;
            });
        }
    );
