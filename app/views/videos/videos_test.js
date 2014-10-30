/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller videos', function() {
    var $httpBackend, $rootScope, $scope, createController;

    beforeEach(module('lmControllers', 'lmServices'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = {};

        createController = function() {
            $controller('videos', {
                $scope: $scope
            });
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function createArticles(first, last) {
        var v = [];
        for (var i = first; i >= last; i--) {
            v.push(createArticle(i));
        }
        return v;
    }

    function createArticle(i) {
        return {
            id: 'id' + i,
            validated: true,
            firstValidationTimeNano: 'id' + i + '_nano'
        };
    }

    function createAndExpect(articles) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=music%7Cmovie' +
            '&count=20' +
            '&validated_before=0' +
            '&validated_only=true'
        ).respond(articles);
        createController();
    }

    function createAndFlush(articles) {
        createAndExpect(articles);
        $httpBackend.flush();
    }

    function expectMoreAndFlush(before, articles) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=music%7Cmovie' +
            '&count=20' +
            '&validated_before=' + before +
            '&validated_only=true'
        ).respond(articles);
        $scope.load();
        $httpBackend.flush();
    }

    describe('before the articles are loaded', function() {
        beforeEach(function() {
            createAndExpect(createArticles(100, 99));
        });
        afterEach(function() {
            $httpBackend.flush();
        });

        it('should set the title', function() {
            $rootScope.title.should.equal('Videos — LilyMandarin');
        });

        it('should set the tab', function() {
            $rootScope.tab.should.equal('videos');
        });

        it('should set the status to "loading"', function() {
            $scope.loadStatus.should.equal('loading');
        });
    });

    describe('after 2 articles are loaded', function() {
        beforeEach(function() {
            createAndFlush(createArticles(100, 99));
        });

        it('should set the status to "ended"', function() {
            $scope.loadStatus.should.equal('ended');
        });

        it('should set the articles', function() {
            $scope.articles.should.deep.resource.equal(createArticles(100, 99));
        });
    });

    describe('after 20 articles are loaded', function() {
        beforeEach(function() {
            createAndFlush(createArticles(100, 81));
        });

        it('should set the status to "ready"', function() {
            $scope.loadStatus.should.equal('ready');
        });

        it('should set the articles', function() {
            $scope.articles.should.deep.resource.equal(createArticles(100, 81));
        });

        describe('after the next 0 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', []);
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should keep the articles unchanged', function() {
                $scope.articles.should.deep.resource.equal(createArticles(100, 81));
            });
        });

        describe('after the next 2 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', createArticles(80, 79));
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should append the next articles', function() {
                $scope.articles.should.deep.resource.equal(createArticles(100, 79));
            });
        });

        describe('after the next 20 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', createArticles(80, 61));
            });

            it('should set the status to "ready"', function() {
                $scope.loadStatus.should.equal('ready');
            });

            it('should append the next articles', function() {
                $scope.articles.should.deep.resource.equal(createArticles(100, 61));
            });
        });
    });
});
