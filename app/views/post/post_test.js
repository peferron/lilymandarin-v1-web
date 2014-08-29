/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller post', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $httpBackend, $rootScope, $location, $scope, createController, post;

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $scope = {};

        var $controller = $injector.get('$controller');
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

    it('should enforce canonical path if id does not match', function() {
        $location.path('/post/xyzid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(post);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/post/abcid/abcslug');
    });

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/post/abcid/xyzslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(post);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/post/abcid/abcslug');
    });

    it('should set everything right', function() {
        $location.path('/post/abcid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(post);
        createController();
        $rootScope.tab.should.equal('posts');
        $httpBackend.flush();

        $rootScope.title.should.equal('abctitle — LilyMandarin');
        $scope.socialUrl.should.equal('http://lilymandarin.com/post/abcid/abcslug');
        $scope.socialText.should.equal('abczhcn / abcenus');
        $scope.post.id.should.equal('abcid');
    });
});
