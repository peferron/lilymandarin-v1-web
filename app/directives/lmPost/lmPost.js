'use strict';

angular
    .module('lmDirectives')
    .directive('lmPost', function() {
        return {
            restrict: 'E',
            scope: {
                post: '=',
                clickable: '='
            },
            templateUrl: '/directives/lmPost/lmPost.html',
            controller: function($scope, Domain) {
                // We don't need a watch here, because the only case where $scope.post won't be
                // available here is if we're on the single post view; and the social buttons
                // are hidden in this view.
                if ($scope.post) {
                    var path = '/post/' + $scope.post.id + '/' + $scope.post.slug;
                    $scope.socialUrl = Domain.origin + path;

                    var line = $scope.post.lines[0];
                    $scope.socialText = line['zh-CN'] + ' / ' + line['en-US'];
                }
            }
        };
    });
