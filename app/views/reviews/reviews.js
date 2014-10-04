'use strict';

angular
    .module('lmControllers')
    .controller('reviews', function($rootScope, $scope, Analytics, Review) {
        if (!$rootScope.modalTemplateUrl) {
            $rootScope.title = 'Student reviews — LilyMandarin';
            $rootScope.tab = 'home';
            Analytics.page();
        }

        $scope.reviews = Review.query();
    });
