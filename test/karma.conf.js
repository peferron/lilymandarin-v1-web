'use strict';

module.exports = function(config) {
    var libJS = [
        'node_modules/jquery/dist/jquery.js',
        'node_modules/chai-angular/chai-angular.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-mocks/angular-mocks.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/fastclick/lib/fastclick.js'
    ];

    var appJS = [
        'app/app.js',
        'app/route.js',
        'app/directives/**/*.js',
        'app/filters/**/*.js',
        'app/services/**/*.js',
        'app/views/**/*.js'
    ];

    var appHTML = [
        'app/directives/**/*.html'
    ];

    config.set({
        basePath : '../',
        files : libJS.concat(appJS, appHTML),
        autoWatch : true,
        frameworks: ['chai', 'mocha'],
        reporters: ['progress', 'coverage'],
        browsers : ['Chrome'],
        plugins : [
            'karma-chai',
            'karma-chrome-launcher',
            'karma-coverage',
            'karma-mocha',
            'karma-ng-html2js-preprocessor'
        ],
        preprocessors: (function() {
            var preprocessors = {};
            appHTML.forEach(function(path) {
                preprocessors[path] = ['ng-html2js'];
            });
            appJS.forEach(function(path) {
                preprocessors[path] = ['coverage'];
            });
            return preprocessors;
        }()),
        ngHtml2JsPreprocessor: {
            stripPrefix: 'app',
            moduleName: 'lmTemplates'
        },
        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'test/coverage'},
                {type: 'lcov', dir: 'test/coverage'},
            ]
        }
    });
};
