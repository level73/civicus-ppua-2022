module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                // define a string to put between each file in the concatenated output
                separator: grunt.util.linefeed + '/* --- concatenate --- */' + grunt.util.linefeed,
                stripBanners: true,
                sourceMap: true
            },
            dist: {
                // the files to concatenate
                src: ['src/js/script.js', 'src/js/<%= pkg.name %>.js'],
                // the location of the resulting JS file
                dest: 'src/js/<%= pkg.name %>.concat.js'
            },
        },

        sass: {
            always: {
                files: {
                    'css/main.css': 'src/scss/main.scss'
                }
            }
        },

        copy: {
            build: {
                files: [
                    {
                        src: 'src/components/jquery/dist/jquery.min.js',
                        dest: 'js/vendor/jquery.min.js'
                    },
                    {
                        src: 'src/components/bootstrap/dist/js/bootstrap.min.js',
                        dest: 'js/vendor/bootstrap.min.js'
                    },
                    {
                        src: 'src/components/bootstrap/dist/css/bootstrap.min.css',
                        dest: 'css/vendor/bootstrap.min.css'
                    },
                    {
                        src: 'src/components/image-map-resizer/js/imageMapResizer.min.js',
                        dest: 'js/vendor/imageMapResizer.min.js'
                    },
                ]
            }
        },

        uglify: {
            js: {
                options: {
                    preserveComments: false
                },
                files: {
                    'js/script.min.js': ['src/js/<%= pkg.name %>.concat.js'],
                    'js/main.min.js': ['src/js/main.js']
                }
            }
        },

        watch: {
            concat: {
                files: ['src/js/vendor/*.js', 'src/js/<%= pkg.name %>.js', 'src/js/script.js'],
                tasks: 'concat'
            },
            sass: {
                files: 'src/scss/*',
                tasks: 'sass:always',
                options: {
                    livereload: true
                }
            },
            uglify: {
                files: ['src/js/<%= pkg.name %>.concat.js', 'src/js/main.js'],
                tasks: 'uglify:js'
            }
        }

    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', [
            'copy:build',
            'sass:always',
            'concat:dist',
            'uglify:js'
        ]
    );
};
