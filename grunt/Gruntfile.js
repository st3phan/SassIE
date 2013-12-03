/*global module:false*/
module.exports = function(grunt) {
	
	grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    '../js/dist/main.min.js': ['../js/tmp/main.js'],
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanner: true,
            },
            dist: {
                src: [
                    '../js/src/main.js',
                ],
                dest: '../js/tmp/main.js',
            },
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: '../css/',
                src: ['*.css', '!*.min.css'],
                dest: '../css/',
                ext: '.min.css'
            }
        },
		compass: {
			dist: {
				options: {
					sassDir: '../css/scss',
					cssDir: '../css',
					imagesDir: '../img',
					outputStyle: 'compressed',
					noLineComments: true,
					relativeAssets: true
				}
			},
			dev: {
				options: {
					sassDir: '../css/scss',
					cssDir: '../css',
					imagesDir: '../img',
					outputStyle: 'expanded',
					noLineComments: false,
					relativeAssets: true,
					//debugInfo: true // Enable for source maps!
				}
			}
		},
		watch: {
            options: {
                livereload: true,
                force: true
            },
            css: {
                files: '../css/**/*.scss',
                tasks: ['compass:dev', 'cssmin', 'play:complete'],
            },
			scripts : {
				files: ['../js/**/*.js', '!../js/**/*.min.js'],
				tasks: ['concat', 'uglify', 'play:complete']
			}
		},
        play: {
            complete: {
                file: './complete.m4r'
            }
        },
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-play');
	
	grunt.registerTask('default', ['compass:dist', 'cssmin', 'uglify', 'play:complete']);
	grunt.registerTask('dev', ['compass:dev', 'play:complete']);
};