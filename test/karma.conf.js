'use strict';

module.exports = function(config) {
    config.set({
        basePath : '../',
        files : [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/chai-angular/chai-angular.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-resource/angular-resource.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/fastclick/lib/fastclick.js',
            'app/app.js',
            'app/route.js',
            'app/directives/**/*.js',
            'app/directives/**/*.html',
            'app/filters/**/*.js',
            'app/services/**/*.js',
            'app/views/**/*.js'
        ],
        autoWatch : true,
        frameworks: ['chai', 'mocha'],
        reporters: ['progress'],
        browsers : ['Chrome'],
        plugins : [
            'karma-chai',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-ng-html2js-preprocessor'
        ],
        preprocessors: {
            'app/directives/**/*.html': ['ng-html2js']
        },
        ngHtml2JsPreprocessor: {
            stripPrefix: 'app',
            moduleName: 'lmTemplates'
        }
    });
};
