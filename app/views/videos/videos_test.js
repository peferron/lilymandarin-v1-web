/* global describe: false, beforeEach: false, module: false, inject: false, afterEach: false,
    it: false */

'use strict';

describe('controller videos', function() {
    beforeEach(module('lmControllers'));
    beforeEach(module('lmServices'));

    var $httpBackend, $rootScope, $scope, createController;

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

    function createVideos(first, last) {
        var v = [];
        for (var i = first; i >= last; i--) {
            v.push(createVideo(i));
        }
        return v;
    }

    function createVideo(i) {
        return {
            firstValidationTimeNano: 'id' + i + '_nano',
            id: 'id' + i
        };
    }

    function createAndExpect(videos) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=music%7Cmovie' +
            '&count=20' +
            '&validated_before=0' +
            '&validated_only=true'
        ).respond(videos);
        createController();
    }

    function createAndFlush(videos) {
        createAndExpect(videos);
        $httpBackend.flush();
    }

    function expectMoreAndFlush(before, videos) {
        $httpBackend.expectGET('/api/v1/articles.json' +
            '?categories=music%7Cmovie' +
            '&count=20' +
            '&validated_before=' + before +
            '&validated_only=true'
        ).respond(videos);
        $scope.load();
        $httpBackend.flush();
    }

    describe('before the videos are loaded', function() {
        beforeEach(function() {
            createAndExpect(createVideos(100, 99));
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

    describe('after 2 videos are loaded', function() {
        beforeEach(function() {
            createAndFlush(createVideos(100, 99));
        });

        it('should set the status to "ended"', function() {
            $scope.loadStatus.should.equal('ended');
        });

        it('should set the videos', function() {
            $scope.videos.should.deep.resource.equal(createVideos(100, 99));
        });
    });

    describe('after 20 videos are loaded', function() {
        beforeEach(function() {
            createAndFlush(createVideos(100, 81));
        });

        it('should set the status to "ready"', function() {
            $scope.loadStatus.should.equal('ready');
        });

        it('should set the videos', function() {
            $scope.videos.length.should.equal(20);
            $scope.videos[0].id.should.equal('id100');
            $scope.videos[19].id.should.equal('id81');
        });

        describe('after the next 0 videos are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', []);
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should keep the videos unchanged', function() {
                $scope.videos.length.should.equal(20);
                $scope.videos.should.deep.resource.equal(createVideos(100, 81));
            });
        });

        describe('after the next 2 videos are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', createVideos(80, 79));
            });

            it('should set the status to "ended"', function() {
                $scope.loadStatus.should.equal('ended');
            });

            it('should append the next videos', function() {
                $scope.videos.length.should.equal(22);
                $scope.videos.should.deep.resource.equal(createVideos(100, 79));
            });
        });

        describe('after the next 20 videos are loaded', function() {
            beforeEach(function() {
                expectMoreAndFlush('id81_nano', createVideos(80, 61));
            });

            it('should set the status to "ready"', function() {
                $scope.loadStatus.should.equal('ready');
            });

            it('should append the next videos', function() {
                $scope.videos.length.should.equal(40);
                $scope.videos.should.deep.resource.equal(createVideos(100, 61));
            });
        });
    });
});
