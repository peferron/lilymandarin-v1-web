/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller video', function() {
    beforeEach(module('lmControllers', 'lmServices'));

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

    function createAndExpect() {
        $httpBackend.expectGET('/api/v1/articles/abcid.json').respond(video);
        createController();
    }

    function createAndFlush() {
        createAndExpect();
        $httpBackend.flush();
    }

    it('should enforce canonical path if slug does not match', function() {
        $location.path('/video/abcid/xyzslug');
        createAndFlush();
        $location.path().should.equal('/video/abcid/abcslug');
    });

    describe('when canonical path matches', function() {
        beforeEach(function() {
            $location.path('/video/abcid/abcslug');
        });

        describe('before the video is loaded', function() {
            beforeEach(createAndExpect);

            it('should set the tab', function() {
                $rootScope.tab.should.equal('videos');
                $httpBackend.flush();
            });

            it('should use default video height and width if media is absent', function() {
                delete video.internal.medias['main-video'];
                $httpBackend.flush();
                $scope.videoHeight.should.equal(100);
                $scope.videoWidth.should.equal(100);
            });
        });

        describe('after the default video is loaded', function() {
            beforeEach(createAndFlush);

            it('should set the title', function() {
                $rootScope.title.should.equal('abctitle — LilyMandarin');
            });

            it('should set the social url and text', function() {
                $scope.socialUrl.should.equal('http://lilymandarin.com/video/abcid/abcslug');
                $scope.socialText.should.equal('abctitle');
            });

            it('should set the video', function() {
                $scope.video.should.deep.resource.equal(video);
            });

            it('should set the video height and width', function() {
                $scope.videoHeight.should.equal(1080);
                $scope.videoWidth.should.equal(1920);
            });

            it('should set the sources', function() {
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
    });
});
