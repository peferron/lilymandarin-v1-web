'use strict';

angular
    .module('lm')
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: '/views/home/home.html',
                controller: 'home'
            })
            .when('/posts', {
                templateUrl: '/views/posts/posts.html',
                controller: 'posts'
            })
            .when('/post/:id', {
                templateUrl: '/views/post/post.html',
                controller: 'post'
            })
            .when('/post/:id/:slug', {
                templateUrl: '/views/post/post.html',
                controller: 'post'
            })
            .when('/photos', {
                templateUrl: '/views/photos/photos.html',
                controller: 'photos'
            })
            .when('/photo/:id', {
                templateUrl: '/views/photo/photo.html',
                controller: 'photo'
            })
            .when('/photo/:id/:slug', {
                templateUrl: '/views/photo/photo.html',
                controller: 'photo'
            })
            .when('/videos', {
                templateUrl: '/views/videos/videos.html',
                controller: 'videos'
            })
            .when('/video/:id', {
                templateUrl: '/views/video/video.html',
                controller: 'video'
            })
            .when('/video/:id/:slug', {
                templateUrl: '/views/video/video.html',
                controller: 'video'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
