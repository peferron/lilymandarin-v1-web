'use strict';

angular
    .module('lwControllers')
    .controller('Reviews',
        function($rootScope, $scope, Analytics, Review) {
            if (!$rootScope.modal) {
                $rootScope.title = 'Student reviews — LilyMandarin';
                $rootScope.tab = 'home';
                Analytics.page();
            }

            $scope.reviews = Review.query();
        }
    );