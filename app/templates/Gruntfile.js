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
                files: [
                    '<%%= yeoman.public %>/scss/{,*/}*.{scss,sass}'<% if (includeAdmin) { %>,
                    '<%%= yeoman.public %>/scss/admin/{,*/}*.{scss,sass}'<% } %>
                ],
                tasks: ['compass:server'<% if (includeAdmin) { %>,'compass:admin'<% } %>]
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%%= yeoman.public %>/scss/{,*/}*.scss',
                    '<%%= yeoman.public %>/js/app/{,*/}*.js'<% if (includeAdmin) { %>,
                    '<%%= yeoman.public %>/js/admin/{,*/}*.js'<% } %>,
                    '<%%= yeoman.public %>/js/{,*/}*.js',
                    '!<%%= yeoman.public %>/js/main.build.js'<% if (includeAdmin) { %>,
                    '!<%%= yeoman.public %>/js/admin/main.build.js'<% } %>,
                    '<%%= yeoman.application %>/views/{,*/}*.php',
                    '<%%= yeoman.application %>/models/*.php',
                    '<%%= yeoman.application %>/controllers/*.php',
                    '<%%= yeoman.application %>/lang/{,*/}*.php'<% if (includeAdmin) { %>,
                    '<%%= yeoman.public %>/js/admin/{,*/}*.js',
                    '<%%= yeoman.application %>/views/admin/{,*/}*.php'
                    <% } %>
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
                '<%%= yeoman.public %>/js/app/{,*/}*.js'<% if (includeAdmin) { %>,
                '<%%= yeoman.public %>/js/admin/{,*/}*.js'<% } %>,
                '!<%%= yeoman.public %>/js/components/*',
                '!<%%= yeoman.public %>/js/vendor/*'<% if (includeAdmin) { %>,
                '!<%%= yeoman.public %>/js/admin/vendor/*'<% } %>,
                '!<%%= yeoman.public %>/js/main.build.js'<% if (includeAdmin) { %>,
                '!<%%= yeoman.public %>/js/admin/main.build.js'
                <% } %>
            ]
        },
        compass: {
            options: {
                sassDir: '<%%= yeoman.public %>/scss',
                cssDir: '<%%= yeoman.public %>/css',
                generatedImagesDir: '<%%= yeoman.public %>/img',
                imagesDir: '<%%= yeoman.public %>/img',
                javascriptsDir: '<%%= yeoman.public %>/js',
                fontsDir: '<%%= yeoman.public %>/css/fonts',
                importPath: '<%%= yeoman.public %>/js/components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img',
                httpFontsPath: '/css/fonts',
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
            }<% if (includeAdmin) { %>,
            admin: {
                options: {
                    sassDir: '<%%= yeoman.public %>/scss/admin',
                    cssDir: '<%%= yeoman.public %>/css/admin',
                    generatedImagesDir: '<%%= yeoman.public %>/img/admin',
                    imagesDir: '<%%= yeoman.public %>/img/admin',
                    javascriptsDir: '<%%= yeoman.public %>/js/admin',
                    fontsDir: '<%%= yeoman.public %>/css/admin/fonts',
                    importPath: '<%%= yeoman.public %>/js/components',
                    httpImagesPath: '/img/admin',
                    httpGeneratedImagesPath: '/img/admin',
                    httpFontsPath: '/css/admin/fonts',
                    relativeAssets: false
                }
            }<% } %>
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%%= yeoman.public %>/js',
                    name: 'main',
                    out: '<%%= yeoman.public %>/js/main.build.js',
                    mainConfigFile: '<%%= yeoman.public %>/js/main.js',
                    paths: {
                        requireLib: 'components/requirejs/require'
                    },
                    include: 'requireLib',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }<% if (includeAdmin) { %>,
            admin: {
                options: {
                    baseUrl: '<%%= yeoman.public %>/js',
                    name: 'admin/main',
                    out: '<%%= yeoman.public %>/js/admin/main.build.js',
                    mainConfigFile: '<%%= yeoman.public %>/js/admin/main.js',
                    paths: {
                        requireLib: 'components/requirejs/require'
                    },
                    include: 'requireLib',
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                }
            }<% } %>
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.public %>/img'
                }]
            }<% if (includeAdmin) { %>,
            admin: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img/admin',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= yeoman.public %>/img/admin'
                }]
            }<% } %>
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.public %>/img'
                }]
            }<% if (includeAdmin) { %>,
            admin: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.public %>/img/admin',
                    src: '{,*/}*.svg',
                    dest: '<%%= yeoman.public %>/img/admin'
                }]
            }<% } %>
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.public %>/css/main.css': [
                        '<%%= yeoman.public %>/css/main.css'
                    ]
                }
            }<% if (includeAdmin) { %>,
            admin: {
                files: {
                    '<%%= yeoman.public %>/css/admin/main.css': [
                        '<%%= yeoman.public %>/css/admin/main.css'
                    ],
                    '<%%= yeoman.public %>/css/admin/editor.css': [
                        '<%%= yeoman.public %>/css/admin/editor.css'
                    ]
                }
            }<% } %>
        },
        concurrent: {
            server: [
                'compass'
            ],
            dist: [
                'compass:dist',
                'imagemin:dist',
                'svgmin:dist'
            ]<% if (includeAdmin) { %>,
            admin: [
                'compass:admin',
                'imagemin:admin',
                'svgmin:admin'
            ]<% } %>
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

    grunt.registerTask('build', function (target) {

        if (target === 'all' || target === 'admin') {
            grunt.task.run([
                'concurrent:admin',
                'requirejs:admin',
                'cssmin:admin'
            ]);
            if(target === 'admin') return;
        }

        grunt.task.run([
            'concurrent:dist',
            'requirejs:dist',
            'cssmin:dist'
        ]);
    });

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};