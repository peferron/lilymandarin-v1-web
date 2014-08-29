/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller video', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $httpBackend, $rootScope, $location, $scope, createController, video;

    beforeEach(inject(function(_$httpBackend_, _$rootScope_, _$location_, $controller) {
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        $scope = {};

        createController = function() {
            $controller('video', {
                $scope: $scope,
                $routeParams: {
                    id: 'abcid'
                }
            });
        };

        video = {
            id: 'abcid',
            title: 'abctitle',
            slug: 'abcslug',
            external: {
                youtube: 'abcyoutube',
                youku: 'abcyouku'
            },
            internal: {
                medias: {
                    'main-video': {
                        filename: 'abcfilename',
                        height: 1080,
                        width: 1920
                    },
                    'poster-video': {
                        height: 345,
                        width: 678
                    }
                },

            },
            lines: [
                {
                    'zh-CN': 'abczhcn',
                    'en-US': 'abcenus'
                },
                {
                    'zh-CN': 'defzhcn',
                    'en-US': 'defenus'
                }
            ]
        };
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should enforce canonical path if id does not match', function() {
        $location.path('/video/xyzid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(video);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/video/abcid/abcslug');
    });

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/video/abcid/xyzslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(video);
        createController();
        $httpBackend.flush();

        $location.path().should.equal('/video/abcid/abcslug');
    });

    it('should use default video height and width if media is absent', function() {
        $location.path('/video/abcid/abcslug');
        delete video.internal.medias['main-video'];

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(video);
        createController();
        $httpBackend.flush();

        $scope.videoHeight.should.equal(100);
        $scope.videoWidth.should.equal(100);
    });

    it('should set everything right', function() {
        $location.path('/video/abcid/abcslug');

        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(video);
        createController();
        $rootScope.tab.should.equal('videos');
        $httpBackend.flush();

        $rootScope.title.should.equal('abctitle — LilyMandarin');
        $scope.socialUrl.should.equal('http://lilymandarin.com/video/abcid/abcslug');
        $scope.socialText.should.equal('abctitle');
        $scope.video.id.should.equal('abcid');
        $scope.videoHeight.should.equal(1080);
        $scope.videoWidth.should.equal(1920);
        $scope.sources.available.should.deep.equal([
            {type: 'internal', value: 'abcfilename', height: 1080},
            {type: 'external-youtube', value: 'abcyoutube'},
            {type: 'external-youku', value: 'abcyouku'}
        ]);
        $scope.sources.current.should.deep.equal(
            {type: 'internal', value: 'abcfilename', height: 1080}
        );
        $scope.sources.remaining.should.deep.equal([
            {type: 'external-youtube', value: 'abcyoutube'},
            {type: 'external-youku', value: 'abcyouku'}
        ]);
    });
});
