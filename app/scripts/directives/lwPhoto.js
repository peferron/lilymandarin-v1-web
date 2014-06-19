'use strict';

angular
    .module('lwDirectives')
    .directive('lwPhoto', function() {
        return {
            restrict: 'E',
            scope: {
                photo: '='
            },
            templateUrl: '/views/lwPhoto.html',
            controller: function($scope, ClickTap, Domain) {
                // We don't need a watch here, because the only case where $scope.photo won't be
                // available here is if we're on the single photo view; and the social buttons
                // are hidden in this view.
                if ($scope.photo) {
                    var path = '/photo/' + $scope.photo.id + '/' + $scope.photo.slug;
                    $scope.socialUrl = Domain.origin + path;

                    var line = $scope.photo.lines[0];
                    $scope.socialText = line['zh-CN'] + ' / ' + line['en-US'];
                }

                $scope.clickTap = ClickTap;
            }
        };
    });
