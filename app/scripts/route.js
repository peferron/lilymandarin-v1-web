'use strict';

angular
    .module('lw')
    .config(function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        
        $routeProvider
            .when('/', {
                templateUrl: '/views/home.html',
                controller: 'Home'
            })
            .when('/reviews', {
                templateUrl: '/views/reviews.html',
                controller: 'Reviews'
            })
            .when('/posts', {
                templateUrl: '/views/posts.html',
                controller: 'Posts'
            })
            .when('/post/:id', {
                templateUrl: '/views/post.html',
                controller: 'Post'
            })
            .when('/post/:id/:slug', {
                templateUrl: '/views/post.html',
                controller: 'Post'
            })
            .when('/photos', {
                templateUrl: '/views/photos.html',
                controller: 'Photos'
            })
            .when('/photo/:id', {
                templateUrl: '/views/photo.html',
                controller: 'Photo'
            })
            .when('/photo/:id/:slug', {
                templateUrl: '/views/photo.html',
                controller: 'Photo'
            })
            .when('/videos', {
                templateUrl: '/views/videos.html',
                controller: 'Videos'
            })
            .when('/video/:id', {
                templateUrl: '/views/video.html',
                controller: 'Video'
            })
            .when('/video/:id/:slug', {
                templateUrl: '/views/video.html',
                controller: 'Video'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
