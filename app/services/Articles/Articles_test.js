/* global describe: false, beforeEach: false, module: false, inject: false, it: false,
    afterEach: false, should: false */

'use strict';

describe('service Articles', function() {
    var $httpBackend, Articles;
    var $scope;

    beforeEach(module('lmServices'));

    beforeEach(inject(function(_$httpBackend_, _Articles_) {
        $httpBackend = _$httpBackend_;
        Articles = _Articles_;
        $scope = {};
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function load(requestCount, validatedBefore, responseCount, callback) {
        var a = createArticles(responseCount);

        $httpBackend
            .expectGET('/api/v1/articles.json' +
                '?categories=abc' +
                '&count=' + requestCount +
                '&validated_before=' + validatedBefore +
                '&validated_only=true')
            .respond(JSON.stringify(a));

        Articles.load({categories: 'abc', count: requestCount}, $scope, callback);

        return a;
    }

    function createArticles(n) {
        var a = [];
        for (var i = 0; i < n; i++) {
            a.push({
                id: 'id' + i,
                validated: true,
                firstValidationTimeNano: i + '000'
            });
        }
        return a;
    }

    it('should set $scope.loadStatus to loading', function() {
        should.not.exist($scope.loadStatus);
        load(1, '0', 1);
        $scope.loadStatus.should.equal('loading');
        $httpBackend.flush();
    });

    it('should set $scope.loadStatus to ready', function() {
        load(1, '0', 3);
        $httpBackend.flush();
        $scope.loadStatus.should.equal('ready');
    });

    it('should set $scope.loadStatus to ended', function() {
        load(1, '0', 0);
        $httpBackend.flush();
        $scope.loadStatus.should.equal('ended');
    });

    it('should return the first batch of articles', function() {
        var a = load(2, '0', 2);
        $httpBackend.flush();
        $scope.articles.should.deep.resource.equal(a);
    });

    it('should call the callback', function() {
        var b;
        var a = load(2, '0', 2, function(articles) {
            b = articles;
        });
        $httpBackend.flush();
        b.should.deep.resource.equal(a);
    });

    it('should append the second batch of articles', function() {
        var a = load(3, '0', 3);
        $httpBackend.flush();
        var b = load(3, '2000', 2);
        $httpBackend.flush();
        $scope.articles.should.deep.resource.equal(a.concat(b));
    });

});
