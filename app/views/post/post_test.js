/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller post', function() {
    var $httpBackend, $rootScope, $location, $scope, createController, post;

    beforeEach(module('lmControllers', 'lmServices'));

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$location_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        $scope = {};

        createController = function() {
            $controller('post', {
                $scope: $scope,
                $routeParams: {
                    id: 'abcid'
                }
            });
        };

        post = {
            id: 'abcid',
            title: 'abctitle',
            slug: 'abcslug',
            internal: {
                medias: {
                    'main-photo': {
                        height: 345,
                        width: 678
                    }
                }
            },
            lines: [
                {
                    'zh-CN': 'abczhcn',
                    'en-US': 'abcenus'
                }
            ]
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    function createAndExpect() {
        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(post);
        createController();
    }

    function createAndFlush() {
        createAndExpect();
        $httpBackend.flush();
    }

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/post/abcid/xyzslug');
        createAndFlush();
        $location.path().should.equal('/post/abcid/abcslug');
    });

    describe('when canonical path matches', function() {
        beforeEach(function() {
            $location.path('/post/abcid/abcslug');
        });

        it('should set the tab before the post is loaded', function() {
            createAndExpect();
            $rootScope.tab.should.equal('posts');
            $httpBackend.flush();
        });

        describe('after the default post is loaded', function() {
            beforeEach(createAndFlush);

            it('should set the title', function() {
                $rootScope.title.should.equal('abctitle — LilyMandarin');
            });

            it('should set the social url and text', function() {
                $scope.socialUrl.should.equal('http://lilymandarin-v1.peferron.com/post/abcid/abcslug');
                $scope.socialText.should.equal('abczhcn / abcenus');
            });

            it('should set the post', function() {
                $scope.post.should.deep.resource.equal(post);
            });
        });
    });
});
