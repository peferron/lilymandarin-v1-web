/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller reviews', function() {
    var $httpBackend, $rootScope, $scope, createController, reviews;

    beforeEach(module('lmControllers', 'lmServices'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = {};

        createController = function() {
            $controller('reviews', {
                $scope: $scope
            });
        };

        reviews = [
            {
                name: 'name0',
                photo: 'photo0.jpg',
                text: 'text0'
            },
            {
                name: 'name1',
                photo: 'photo1.jpg',
                text: 'text1'
            },
        ];
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function createAndExpect() {
        $httpBackend.expectGET('/static/data/reviews.json').respond(reviews);
        createController();
    }

    function createAndFlush() {
        createAndExpect();
        $httpBackend.flush();
    }

    describe('before the reviews are loaded', function() {
        beforeEach(createAndExpect);
        afterEach(function() {
            $httpBackend.flush();
        });

        it('should set the title', function() {
            $rootScope.title.should.equal('Student reviews — LilyMandarin');
        });

        it('should set the tab', function() {
            $rootScope.tab.should.equal('home');
        });
    });

    describe('after the reviews are loaded', function() {
        beforeEach(createAndFlush);

        it('should set the videos', function() {
            $scope.reviews.should.deep.resource.equal(reviews);
        });
    });
});
