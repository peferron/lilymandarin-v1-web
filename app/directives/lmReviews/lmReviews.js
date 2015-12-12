'use strict';

angular
    .module('lmDirectives')
    .directive('lmReviews', function() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/directives/lmReviews/lmReviews.html',
            controller: function($scope, Review) {
                $scope.reviews = Review.query();
            }
        };
    });
