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
        config: {
            host: '<%= projectHost %>',
            serverHost: '<%= projectHost %>.local.atelierfolklore.ca',
            public: 'public',
            application: 'app'
        },
        watch: {
            compass: {
                files: [
                    '<%%= config.public %>/scss/{,*/}*.{scss,sass}'
                ],
                tasks: ['compass:server'],
                options: {
                    livereload: true
                }
            },<% if (includeAdmin) { %>
            compassAdmin: {
                files: [
                    '<%%= config.public %>/scss/admin/{,*/}*.{scss,sass}'
                ],
                tasks: ['compass:admin'],
                options: {
                    livereload: true
                }
            },<% } %>
            gruntfile: {
                files: ['Gruntfile.js']
            },
            js: {
                files: [
                    '<%%= config.public %>/js/{,*/}*.js',
                    '<%%= config.public %>/js/app/{,*/}*.js'<% if (includeAdmin) { %>,
                    '<%%= config.public %>/js/admin/{,*/}*.js'<% } %>,
                    '!<%%= config.public %>/js/components/*',
                    '!<%%= config.public %>/js/vendor/*'<% if (includeAdmin) { %>,
                    '!<%%= config.public %>/js/admin/vendor/*'<% } %>,
                    '!<%%= config.public %>/js/main.build.js'<% if (includeAdmin) { %>,
                    '!<%%= config.public %>/js/admin/ckeditor_config.js',
                    '!<%%= config.public %>/js/admin/main.build.js'
                    <% } %>
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: 35729
                },
                files: [
                    '<%%= config.public %>/img/{,*/}*.{gif,jpeg,jpg,png,svg,webp}',
                    '<%%= config.application %>/views/{,*/}*.php',
                    '<%%= config.application %>/models/*.php',
                    '<%%= config.application %>/controllers/*.php',
                    '<%%= config.application %>/lang/{,*/}*.php'<% if (includeAdmin) { %>,
                    '<%%= config.application %>/views/admin/{,*/}*.php'
                    <% } %>
                ]
            }
        },

        open : {
            server : {
                path: 'http://<%%= config.serverHost %>',
                app: app: (process.platform === 'win32') ? 'Chrome':'Google Chrome'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.public %>/js/{,*/}*.js',
                '<%%= config.public %>/js/app/{,*/}*.js'<% if (includeAdmin) { %>,
                '<%%= config.public %>/js/admin/{,*/}*.js'<% } %>,
                '!<%%= config.public %>/js/components/*',
                '!<%%= config.public %>/js/vendor/*'<% if (includeAdmin) { %>,
                '!<%%= config.public %>/js/admin/vendor/*'<% } %>,
                '!<%%= config.public %>/js/main.build.js'<% if (includeAdmin) { %>,
                '!<%%= config.public %>/js/admin/ckeditor_config.js',
                '!<%%= config.public %>/js/admin/main.build.js'
                <% } %>
            ]
        },

        compass: {
            options: {
                sassDir: '<%%= config.public %>/scss',
                cssDir: '<%%= config.public %>/css',
                generatedImagesDir: '<%%= config.public %>/img',
                imagesDir: '<%%= config.public %>/img',
                javascriptsDir: '<%%= config.public %>/js',
                fontsDir: '<%%= config.public %>/css/fonts',
                importPath: '<%%= config.public %>/js/components',
                httpImagesPath: '/img',
                httpGeneratedImagesPath: '/img',
                httpFontsPath: '/css/fonts',
                relativeAssets: false
            },
            dist: {
                options: {
                    generatedImagesDir: '<%%= config.public %>/img'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }<% if (includeAdmin) { %>,
            admin: {
                options: {
                    sassDir: '<%%= config.public %>/scss/admin',
                    cssDir: '<%%= config.public %>/css/admin',
                    generatedImagesDir: '<%%= config.public %>/img/admin',
                    imagesDir: '<%%= config.public %>/img/admin',
                    javascriptsDir: '<%%= config.public %>/js/admin',
                    fontsDir: '<%%= config.public %>/css/admin/fonts',
                    importPath: '<%%= config.public %>/js/components',
                    httpImagesPath: '/img/admin',
                    httpGeneratedImagesPath: '/img/admin',
                    httpFontsPath: '/css/admin/fonts',
                    relativeAssets: false
                }
            }<% } %>
        },
        modernizr: {

            dist: {
                'devFile' : '<%%= config.public %>/js/components/modernizr/modernizr.js',
                'outputFile' : '<%%= config.public %>/js/vendor/modernizr.js',
                'extra' : {
                    'shiv' : true,
                    'printshiv' : false,
                    'load' : true,
                    'mq' : false,
                    'cssclasses' : false
                },
                'extensibility' : {
                    'addtest' : false,
                    'prefixed' : false,
                    'teststyles' : false,
                    'testprops' : false,
                    'testallprops' : false,
                    'hasevents' : false,
                    'prefixes' : false,
                    'domprefixes' : false
                },
                'uglify' : true,
                'tests' : [],
                'parseFiles' : false,
                'files' : {
                    'src': [
                        '<%%= config.public %>/js/{,*/}*.js',
                        '<%%= config.public %>/js/app/{,*/}*.js',
                        '<%%= config.public %>/css/{,*/}*.css',
                        '!<%%= config.public %>/js/vendor/*'
                    ]
                },
                'matchCommunityTests' : false,
                'customTests' : []
            }<% if (includeAdmin) { %>,
            admin: {
                'devFile' : '<%%= config.public %>/js/components/modernizr/modernizr.js',
                'outputFile' : '<%%= config.public %>/js/admin/vendor/modernizr.js',
                'extra' : {
                    'shiv' : true,
                    'printshiv' : false,
                    'load' : true,
                    'mq' : false,
                    'cssclasses' : false
                },
                'extensibility' : {
                    'addtest' : false,
                    'prefixed' : false,
                    'teststyles' : false,
                    'testprops' : false,
                    'testallprops' : false,
                    'hasevents' : false,
                    'prefixes' : false,
                    'domprefixes' : false
                },
                'uglify' : true,
                'tests' : [],
                'parseFiles' : false,
                'files' : {
                    'src': [
                        '<%%= config.public %>/js/admin/{,*/}*.js',
                        '<%%= config.public %>/css/admin/{,*/}*.css',
                        '!<%%= config.public %>/js/admin/vendor/*'
                    ]
                },
                'matchCommunityTests' : false,
                'customTests' : []
            }<% } %>
        },
        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: '<%%= config.public %>/js',
                    name: 'main',
                    out: '<%%= config.public %>/js/main.build.js',
                    mainConfigFile: '<%%= config.public %>/js/main.js',
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
                    baseUrl: '<%%= config.public %>/js',
                    name: 'admin/main',
                    out: '<%%= config.public %>/js/admin/main.build.js',
                    mainConfigFile: '<%%= config.public %>/js/admin/main.js',
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
                    cwd: '<%%= config.public %>/img',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= config.public %>/img'
                }]
            }<% if (includeAdmin) { %>,
            admin: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.public %>/img/admin',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%%= config.public %>/img/admin'
                }]
            }<% } %>
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.public %>/img',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.public %>/img'
                }]
            }<% if (includeAdmin) { %>,
            admin: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.public %>/img/admin',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.public %>/img/admin'
                }]
            }<% } %>
        },
        cssmin: {
            dist: {
                files: {
                    '<%%= config.public %>/css/main.css': [
                        '<%%= config.public %>/css/main.css'
                    ]
                }
            }<% if (includeAdmin) { %>,
            admin: {
                files: {
                    '<%%= config.public %>/css/admin/main.css': [
                        '<%%= config.public %>/css/admin/main.css'
                    ],
                    '<%%= config.public %>/css/admin/editor.css': [
                        '<%%= config.public %>/css/admin/editor.css'
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
                rjsConfig: '<%%= config.public %>/js/main.js'
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'concurrent:server',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('build', function (target) {

        <% if (includeAdmin) { %>
        if (target === 'all' || target === 'admin') {
            grunt.task.run([
                'concurrent:admin',
                'modernizr:admin',
                'requirejs:admin',
                'cssmin:admin'
            ]);
            if(target === 'admin')
            {
                return;
            }
        }
        <% } %>

        grunt.task.run([
            'concurrent:dist',
            'modernizr:dist',
            'requirejs:dist',
            'cssmin:dist'
        ]);
    });

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};
