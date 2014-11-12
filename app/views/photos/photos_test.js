/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller photos', function() {
    var $httpBackend, $rootScope, $scope, createController;

    beforeEach(module('lmControllers', 'lmServices', function($provide) {
        $provide.value('$window', {
            document: {
                body: {
                    clientWidth: 1000
                }
            },
            screen: {
                availHeight: 2000
            }
        });
    }));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $scope = {};

        createController = function() {
            $controller('photos', { $scope: $scope });
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
            firstValidationTimeNano: 'id' + i + '_nano',
            internal: {
                medias: {
                    'main-photo': {
                        height: 640,
                        width: 480
                    }
                }
            }
        };
    }

    function createAndExpect(articles) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=photo' +
            '&count=30' +
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
            '?categories=photo' +
            '&count=30' +
            '&validated_before=' + before +
            '&validated_only=true'
        ).respond(articles);
        $scope.load();
        $httpBackend.flush();
    }

    function checkArticles(n) {
        $scope.articles.should.have.length(n);
        $scope.articles.forEach(function(article, i) {
            return article.id.should.equal('id' + (100 - i));
        });
    }

    describe('before the articles are loaded', function() {
        beforeEach(function() {
            createAndExpect(createArticles(100, 99));
        });
        afterEach(function() {
            $httpBackend.flush();
        });

        it('should set the title', function() {
            $rootScope.title.should.equal('Photos — LilyMandarin');
        });

        it('should set the tab', function() {
            $rootScope.tab.should.equal('photos');
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

        it('should set the css', function() {
            $scope.css.should.equal('lm-photo { width: 497px; }');
        });

        it('should set the articles', function() {
            $scope.articles.should.deep.resource.equal([
                angular.extend(createArticle(100), {
                    style: {
                        top: '0px',
                        left: '0px',
                        height: '662px'
                    }
                }),
                angular.extend(createArticle(99), {
                    style: {
                        top: '0px',
                        left: '502px',
                        height: '662px'
                    }
                })
            ]);
        });
    });

    describe('after 30 articles are loaded', function() {
        beforeEach(function() {
            createAndFlush(createArticles(100, 71));
        });

        it('should set the status to "ready"', function() {
            $scope.loadStatus.should.equal('ready');
        });

        it('should set the articles', function() {
            checkArticles(30);
            $scope.articles[2].should.deep.resource.equal(
                angular.extend(createArticle(98), {
                    style: {
                        top: '667px',
                        left: '0px',
                        height: '662px'
                    }
                })
            );
        });

        describe('after the next 0 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id71_nano', []);
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should keep the articles unchanged', function() {
                checkArticles(30);
            });
        });

        describe('after the next 2 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id71_nano', createArticles(70, 69));
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should append the next articles', function() {
                checkArticles(32);
            });
        });

        describe('after the next 30 articles are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id71_nano', createArticles(70, 41));
            });

            it('should set the status to "ready"', function() {
                $scope.loadStatus.should.equal('ready');
            });

            it('should append the next articles', function() {
                checkArticles(60);
            });
        });
    });
});
