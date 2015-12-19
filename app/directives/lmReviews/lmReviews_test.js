/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('directive lmReviews', function() {
    var element;

    var reviews = [
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

    beforeEach(module('lmDirectives', 'lmTemplates', 'lmServices'));

    beforeEach(inject(function($httpBackend, $compile, $rootScope) {
        $httpBackend.expectGET('/static/data/reviews.json').respond(reviews);
        element = $compile('<lm-reviews></lm-reviews>')($rootScope);
        $rootScope.$digest();
        $httpBackend.flush();
    }));

    it('sets the reviews', function() {
        var $scope = element.isolateScope();
        $scope.reviews.should.deep.resource.equal(reviews);
    });
});
