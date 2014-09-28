'use strict';

module.exports = function(config) {
    config.set({
        basePath : '../',
        files : [
            'node_modules/chai-angular/chai-angular.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/fastclick/lib/fastclick.js',
            'app/app.js',
            'app/route.js',
            'app/directives/**/*.js',
            'app/filters/**/*.js',
            'app/services/**/*.js',
            'app/views/**/*.js'
        ],
        autoWatch : true,
        frameworks: ['mocha', 'chai'],
        reporters: ['progress'],
        browsers : ['Chrome'],
        plugins : ['karma-chrome-launcher', 'karma-mocha', 'karma-chai']
    });
};
