'use strict';

var src = {
	jsAndJsx: ['Gruntfile.js', 'src/**/*.js', 'src/**/*.jsx', 'test/**/*.js'],
	tests: ['test/**/*.js']
};

module.exports = function(grunt) {
	require('time-grunt')(grunt);

	grunt.initConfig({
		browserify: {
			all: {
				files: {
					'dist/scripts.js': ['src/public/js/main.js']
				},
				options: {
					browserifyOptions: {
						debug: true
					},
					transform: ['reactify'],
					plugin: [['minifyify', {
						minify: true,
						map: 'scripts.js.map',
						output: 'dist/scripts.js.map',
						global: true
					}]]
				}
			}
		},

		jshint: {
			jenkins: {
				src: src.jsAndJsx,
				options: {
					reporter: 'checkstyle',
					reporterOutput: 'jshint-checkstyle.xml'
				}
			},

			local: {
				src: src.jsAndJsx,
				options: {
					reporter: require('jshint-stylish')
				}
			},

			options: {
				jshintrc: '.jshintrc'
			}
		},

		jscs: {
			all: {
				files: {
					src: src.jsAndJsx
				},
				options: {
					config: '.jscsrc'
				}
			}
		},

		less: {
			options: {
				ieCompat: true,
				compress: true,
				sourceMap: true,
				sourceMapFileName: 'dist/style.css.map',
				sourceMapRootPath: '/',
				sourceMapURL: 'style.css.map',
				sourceMapBasepath: 'public',
				outputSourceFiles: true
			},
			dist: {
				files: {'dist/style.css': 'src/public/styles/main.less'}
			}
		},

		copy: {
			images: {
				files: [{
					expand: true,
					cwd: 'src/public/',
					src: ['images/**'],
					dest: 'dist/'
				}]
			}
		},

		clean: ['dist'],

		lintspaces: {
			javascript: {
				src: src.jsAndJsx,
				options: {
					newline: true,
					indentation: 'tabs',
					ignores: ['js-comments']
				}
			}
		},

		watch: {
			scripts: {
				files: src.jsAndJsx,
				tasks: ['browserify', 'jshint:local', 'jscs', 'lintspaces']
			},
			css: {
				files: 'src/public/**/*.less',
				tasks: ['less']
			},
			images: {
				files: 'src/images/**/*.*',
				tasks: ['copy']
			},
			test: {
				files: src.tests,
				tasks: ['mochaTest:local']
			},
			options: {
				atBegin: true
			}
		},

		mochaTest: {
			local: {
				src: src.tests,
				options: {reporter: 'spec'}
			},

			jenkins: {
				src: src.tests,
				options: {
					reporter: 'mocha-jenkins-reporter'
				}
			}
		},

		concurrent: {
			dev: ['less', 'browserify', 'jshint:local', 'jscs', 'lintspaces', 'mochaTest:local'],
			dist: ['less', 'browserify', 'jshint:jenkins', 'jscs', 'lintspaces', 'mochaTest:jenkins']
		}
	});

	grunt.loadNpmTasks('grunt-jsxhint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-lintspaces');
	grunt.loadNpmTasks('grunt-jscs');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-mocha-test');

	var devActions = ['clean', 'copy', 'concurrent:dev'];
	var distActions = ['clean', 'copy', 'concurrent:dist'];

	var buildActions = (process.env.NODE_ENV === 'production') ? distActions : devActions;

	grunt.registerTask('default', buildActions);
	grunt.registerTask('build', buildActions);
};
