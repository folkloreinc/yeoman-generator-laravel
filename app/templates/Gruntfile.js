// Generated on 2013-03-22 using generator-webapp 0.1.5
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        host: '<%= projectHost %>',
        serverHost: '<%= projectHost %>.local.atelierfolklore.ca',
        public: 'public',
        application: 'application'
    };

    grunt.initConfig({

        yeoman: yeomanConfig,

        watch: {
            compass: {
                files: ['<%%= yeoman.public %>/scss/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            }
        },
        open: {
            server: {
                path: 'http://<%%= yeoman.serverHost %>'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%%= yeoman.public %>/js/{,*/}*.js',
                '!<%%= yeoman.public %>/js/vendor/*'
            ]
        },
        compass: {
            options: {
                require: 'zurb-foundation',
                sassDir: '<%%= yeoman.public %>/scss',
                cssDir: '<%%= yeoman.public %>/css',
                imagesDir: '<%%= yeoman.public %>/img',
                javascriptsDir: '<%%= yeoman.public %>/js',
                fontsDir: '<%%= yeoman.public %>/css/fonts',
                importPath: '<%%= yeoman.public %>/js/components',
                relativeAssets: false,
                raw: 'http_images_path = \'../img\'\nhttp_generated_images_path = \'../img\'\n'
            },
            dist: {}
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: '<%%= yeoman.public %>/js',
                    name: "main",
                    out: "<%%= yeoman.public %>/js/main-build.js",
                    mainConfigFile: "<%%= yeoman.public %>/js/main.js",
                    paths: {
                        requireLib: "components/requirejs/require"
                    },
                    include: "requireLib",
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
        cssmin: {
            dist: {
                files: {
                    '<%%= yeoman.public %>/css/main.css': [
                        '<%%= yeoman.public %>/css/{,*/}*.css'
                    ]
                }
            }
        },
        bower: {
            all: {
                rjsConfig: '<%%= yeoman.public %>/js/main.js'
            }
        },
        rsync: {
            'dist': {
                src: "./",
                dest: "/www/<%%= yeoman.host %>/",
                host: "www@server1.atelierfolklore.ca",
                recursive: true,
                syncDest: true
            },
        }

    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'open']);
        }

        grunt.task.run([
            'compass',
            'open',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'compass:dist',
        'requirejs',
        'imagemin',
        'cssmin'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'rsync'
    ]);
};
