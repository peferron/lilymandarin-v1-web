'use strict';

module.exports = function (grunt) {

    require('load-grunt-config')(grunt);

    grunt.initConfig({

        m: grunt.option('m') || '',
        app: 'app',
        dist: 'dist',
        deploy: process.env.LILYMANDARIN_WEB_DEPLOY,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            jsTest: {
                files: ['test/spec/**.js'],
                tasks: ['karma']
            },
            icons: {
                files: ['<%= app %>/static/icons/**/*.svg'],
                tasks: ['copy:icons', 'grunticon']
            },
            styles: {
                files: ['<%= app %>/styles/**/*.sass'],
                tasks: ['sass', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app %>/*.html',
                    '<%= app %>/*.js',
                    '<%= app %>/data/**.json',
                    '<%= app %>/directives/**/*.html',
                    '<%= app %>/directives/**/*.js',
                    '<%= app %>/directives/**/*.css',
                    '<%= app %>/filters/**/*.js',
                    '<%= app %>/views/**/*.html',
                    '<%= app %>/views/**/*.js',
                    '<%= app %>/views/**/*.css',
                    '<%= app %>/services/**/*.js',
                    '.tmp/styles/*.css',
                    '.tmp/icons/icons-svg.css',
                    'Gruntfile.js'
                ]
            }
        },

        // Web server
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: false,
                    base: [
                        '.tmp',
                        '<%= app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= dist %>/*',
                        '!<%= dist %>/.git*'
                    ]
                }]
            },
            serve: '.tmp'
        },

        // SVG minification
        svgmin: {
            tmp: {
                expand: true,
                cwd: '<%= app %>/static/icons',
                src: '*.svg',
                dest: '.tmp/static/icons'
            }
        },

        // SVG to CSS
        grunticon: {
            tmp: {
                expand: true,
                cwd: '.tmp/static/icons',
                src: '*.svg',
                dest: '.tmp/static/icons',
                options: {
                    datasvgcss: 'icons-svg.css',
                    template: '<%= app %>/static/icons/template.hbs'
                }
            }
        },

        // Compile SASS to CSS
        // If multiple SASS files, use @import in the SASS file rather than grunt concat
        sass: {
            tmp: {
                src: '<%= app %>/styles/main.sass',
                dest: '.tmp/styles/lilyweb.css'
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            tmp: {
                src: '.tmp/styles/lilyweb.css',
                dest: '.tmp/styles/lilyweb.prefixed.css'
            }
        },

        // CSS minification
        cssmin: {
            tmp: {
                files: [{
                    src: '.tmp/styles/lilyweb.prefixed.css',
                    dest: '.tmp/styles/lilyweb.prefixed.min.css'
                }, {
                    src: '.tmp/static/icons/icons-svg.css',
                    dest: '.tmp/static/icons/icons-svg.min.css'
                }]
            }
        },

        // Template concatenation
        ngtemplates: {
            options: {
                module: 'lw',
                prefix: '/',
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: false,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes:  true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            tmp: {
                cwd: '<%= app %>',
                src: [
                    'directives/**/*.html',
                    'views/**/*.html'
                ],
                dest: '.tmp/views/views.js'
            }
        },

        // JS concatenation
        concat: {
            lilyweb: {
                src: [
                    '<%= app %>/directives/**/*.js',
                    '<%= app %>/filters/**/*.js',
                    '<%= app %>/services/**/*.js',
                    '.tmp/views/views.js'
                ],
                dest: '.tmp/scripts/lilyweb.js'
            },
            libs: {
                src: [
                    '<%= app %>/bower_components/angular/angular.min.js',
                    '<%= app %>/bower_components/angular-resource/angular-resource.min.js',
                    '<%= app %>/bower_components/angular-route/angular-route.min.js',
                    '<%= app %>/bower_components/fastclick/lib/fastclick.min.js'
                ],
                dest: '.tmp/scripts/libs.min.js'
            }
        },

        // Explicit string-based dependency injection for AngularJS minification safety
        ngmin: {
            tmp: {
                src: '.tmp/scripts/lilyweb.js',
                dest: '.tmp/scripts/lilyweb.ngmin.js'
            }
        },

        // JS minification
        uglify: {
            options: {
                preserveComments: 'some'
            },
            tmp: {
                files: [{
                    src: '.tmp/scripts/lilyweb.ngmin.js',
                    dest: '.tmp/scripts/lilyweb.ngmin.min.js'
                }, {
                    src: '<%= app %>/bower_components/fastclick/lib/fastclick.js',
                    dest: '<%= app %>/bower_components/fastclick/lib/fastclick.min.js'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            icons: {
                expand: true,
                cwd: '<%= app %>/static/icons',
                src: ['*.svg'],
                dest: '.tmp/static/icons'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= app %>',
                    src: [
                        'index.html',
                        'robots.txt',
                        'browserconfig.xml',
                        'favicon.ico',
                        'static/data/**',
                        'static/fonts/**',
                        'static/images/**'
                    ],
                    dest: '<%= dist %>'
                }, {
                    src: '<%= app %>/static/lib/bootstrap_custom/css/bootstrap.min.css',
                    dest: '<%= dist %>/styles/libs.min.css'
                }, {
                    expand: true,
                    cwd: '.tmp',
                    src: [
                        'styles/lilyweb.prefixed.min.css',
                        'scripts/lilyweb.ngmin.min.js'
                    ],
                    dest: '<%= dist %>'
                }, {
                    src: '.tmp/static/icons/icons-svg.min.css',
                    dest: '<%= dist %>/styles/icons-svg.min.css'
                }]
            }
        },

        // Strips source maps
        'string-replace': {
            dist: {
                options: {
                    replacements: [{
                        pattern: /\s*\/\/#\s*sourceMappingURL.*/g,
                        replacement: ''
                    }]
                },
                src: '.tmp/scripts/libs.min.js',
                dest: '<%= dist %>/scripts/libs.min.nomap.js'
            }
        },

        // Renames files for browser caching purposes
        rev: {
            options: {
                length: 12
            },
            dist: {
                src: [
                    '<%= dist %>/styles/*.css',
                    '<%= dist %>/scripts/*.js'
                ]
            }
        },

        // Replace blocks in index.html by the built files
        usemin: {
            html: '<%= dist %>/index.html'
        },

        // Minify index.html
        htmlmin: {
            options: {
                collapseBooleanAttributes: true,
                collapseWhitespace: false,
                removeAttributeQuotes: true,
                removeComments: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes:  true,
                removeStyleLinkTypeAttributes: true
            },
            dist: {
                src: '<%= dist %>/index.html',
                dest: '<%= dist %>/index.html'
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        // Deploy
        shell: {
            checksync: {
                command: 'test -z "$(git status --porcelain)"'
            },
            deploy: {
                command: 'git subtree push --prefix dist <%= deploy %> master'
            },
            'deploy-force': {
                command:
                    'git push <%= deploy %> `git subtree split --prefix dist master`:master --force'
            },
            'git-add': {
                command: 'git add -A'
            },
            'git-commit': {
                command: 'git commit -m "<%= m %>"'
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:serve',

            'copy:icons',
            'grunticon',

            'sass',
            'autoprefixer',

            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:serve',

        'sass',
        'autoprefixer',

        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        //'test',

        'clean:dist',

        // SVG
        'svgmin',
        'grunticon',

        // CSS
        'sass',
        'autoprefixer',
        'cssmin',

        // HTML + JS
        'ngtemplates',
        'concat:lilyweb',
        'ngmin',
        'uglify',
        'concat:libs',
        'string-replace',

        // DIST
        'copy',
        'rev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        //'test',
        'build',
        'shell:checksync',
        'shell:deploy'
    ]);

    grunt.registerTask('deploy-force', [
        //'test',
        'build',
        'shell:checksync',
        'shell:deploy-force'
    ]);

    grunt.registerTask('commit', [
        'build',
        'shell:git-add',
        'shell:git-commit'
    ]);
};
