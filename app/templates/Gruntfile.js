// Generated on <%%= (new Date).toISOString().split('T')[0] %> using <%%= pkg.name %> <%%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            host: '<%= projectHost %>',
            serverHost: '<%= projectHost %>.local.atelierfolklore.ca',
            public: 'public',
            application: 'app'
        },
        watch: {
            compass: {
                files: ['<%%= yeoman.public %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass:server']
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%= yeoman.public %>/scss/*.scss',
                    '<%= yeoman.public %>/js/app/{,*/}*.js',
                    '<%= yeoman.public %>/js/{,*/}*.js',
                    '<%= yeoman.application %>/views/{,*/}*.php',
                ]
            }
        },
        open : {
            server : {
                path: 'http://<%%= yeoman.serverHost %>',
                app: 'Google Chrome'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.public %>/js/{,*/}*.js',
                '<%%= yeoman.public %>/js/app/{,*/}*.js',
                '!<%%= yeoman.public %>/js/vendor/*'
            ]
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.public %>/scss',
                cssDir: '<%%= yeoman.public %>/css',
                generatedImagesDir: '<%%= yeoman.public %>/img',
                imagesDir: '<%%= yeoman.public %>/img',
                javascriptsDir: '<%%= yeoman.public %>/js',
                fontsDir: '<%%= yeoman.public %>/fonts',
                importPath: '<%%= yeoman.public %>/js/components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img',
                httpFontsPath: '/fonts',
                relativeAssets: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= yeoman.public %>/img'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%%= yeoman.public %>/js',
                    name: 'main',
                    out: '<%%= yeoman.public %>/js/main-build.js',
                    mainConfigFile: '<%%= yeoman.public %>/js/main.js',
                    paths: {
                        requireLib: 'components/requirejs/require'
                    },
                    include: 'requireLib',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.public %>/img'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.public %>/img'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.public %>/css/main.css': [
                        '<%%= yeoman.public %>/css/main.css'
                    ]
                }
            }
        },
        concurrent: {
            server: [
                'compass'
            ],
            dist: [
                'compass',
                'imagemin',
                'svgmin'
            ]
        },
        bower: {
            options: {
                exclude: ['modernizr']
            },
            all: {
                rjsConfig: '<%%= yeoman.public %>/js/main.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'concurrent:dist',
        'requirejs',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};