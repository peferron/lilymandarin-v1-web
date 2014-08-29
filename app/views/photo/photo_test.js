/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller photo', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $httpBackend, $rootScope, $location, $scope, createController, photo;

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$location_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        $scope = {};

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

    function createAndExpect() {
        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(photo);
        createController();
    }

    function createAndFlush() {
        createAndExpect();
        $httpBackend.flush();
    }

    it('should enforce canonical path if id does not match', function() {
        $location.path('/photo/xyzid/abcslug');
        createAndFlush();
        $location.path().should.equal('/photo/abcid/abcslug');
    });

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/photo/abcid/xyzslug');
        createAndFlush();
        $location.path().should.equal('/photo/abcid/abcslug');
    });

    describe('when canonical path matches', function() {
        beforeEach(function() {
            $location.path('/photo/abcid/abcslug');
        });

        it('should set the tab before the photo is loaded', function() {
            createAndExpect();
            $rootScope.tab.should.equal('photos');
            $httpBackend.flush();
        });

        it('should use default photo height and width if media is absent', function() {
            delete photo.internal.medias['main-photo'];
            createAndFlush();
            $scope.photoHeight.should.equal(100);
            $scope.photoWidth.should.equal(100);
        });

        describe('after loading default photo', function() {
            beforeEach(function() {
                createAndFlush();
            });

            it('should set the title', function() {
                $rootScope.title.should.equal('abctitle — LilyMandarin');
            });

            it('should set the social url and text', function() {
                $scope.socialUrl.should.equal('http://lilymandarin.com/photo/abcid/abcslug');
                $scope.socialText.should.equal('abczhcn / abcenus');
            });

            it('should set the photo id', function() {
                $scope.photo.id.should.equal('abcid');
            });

            it('should set the photo height and width', function() {
                $scope.photoHeight.should.equal(345);
                $scope.photoWidth.should.equal(678);
            });
        });
    });
});
