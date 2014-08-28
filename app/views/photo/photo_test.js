/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller photo', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $httpBackend, $rootScope, $location, $scope, createController, photo;

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $location = $injector.get('$location');
        $scope = {};

        var $controller = $injector.get('$controller');
        createController = function() {
            $controller('photo', {
                $scope: $scope,
                $routeParams: {
                    id: 'abcid'
                }
            });
        };

        photo = {
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
        $location.path('/photo/xyzid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(photo);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/photo/abcid/abcslug');
    });

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/photo/abcid/xyzslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(photo);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/photo/abcid/abcslug');
    });

    it('should use default photo height and width if media is absent', function() {
        $location.path('/photo/abcid/abcslug');
        delete photo.internal.medias['main-photo'];

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(photo);
        createController();
        $httpBackend.flush();

        $scope.photoHeight.should.equal(100);
        $scope.photoWidth.should.equal(100);
    });

    it('should set everything right', function() {
        $location.path('/photo/abcid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(photo);
        createController();
        $httpBackend.flush();

        $rootScope.title.should.equal('abctitle — LilyMandarin');
        $scope.socialUrl.should.equal('http://lilymandarin.com/photo/abcid/abcslug');
        $scope.socialText.should.equal('abczhcn / abcenus');
        $scope.photo.id.should.equal('abcid');
        $scope.photoHeight.should.equal(345);
        $scope.photoWidth.should.equal(678);
    });
});
