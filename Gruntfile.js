
var modRewrite = require('connect-modrewrite');
module.exports = function(grunt){
	grunt.initConfig({

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    'css/main.css': 'scss/style.scss'
                }
            }
        },

        watch: {
            files: ['*.html','app/**/*.html', 'app/**/**/*.html', 'app/**/**/**/*.html', 'app/*.js', 'app/**/*.js', 'app/**/**/*.js', 'scss/*.scss', 'css/*.css', 'Gruntfile.js'],
            tasks: [
                'sass',
            	'concat:jsFiles', 
            	'concat:jsLib', 
            	'concat:cssFiles', 
            	'concat:cssLib', 
            	'ngtemplates', 
            	'uglify', 
            	'cssmin', 
            	'processhtml']
        },

        concat: {
            jsFiles: {
                options: {
                    separator: '\n;'
                },
                src: [
                    'app/app.module.js',
                    'app/app.filters.js',
                    'app/app.config.js',
                    'app/app.service.js',
                    'app/app.run.js',
                    'app/app.constant.js',
                    'app/user/userCtrl.js',
                    'app/task/taskCtrl.js',
                ],
                dest: 'build/origin/app/js/app.js'
            },
            jsLib: {
                options: {
                    separator: '\n;'
                },
                src: [
                    'node_modules/angular/angular.min.js',
                    'node_modules/jquery/dist/jquery.min.js',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js',
                    'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                    'node_modules/angular-ui-router/release/stateEvents.min.js',
                    'node_modules/popper.js/dist/umd/popper.min.js',
                    'node_modules/tether/dist/js/tether.min.js',
                    'node_modules/bootstrap/dist/js/bootstrap.min.js',
                    'node_modules/angular-animate/angular-animate.min.js',
                    'node_modules/angularjs-toaster/toaster.min.js'
                ],
                dest: 'build/origin/lib/app.lib.js'
            },
            cssFiles: {
                options: {
                    separator: '\n'
                },
                src: [
                    'css/main.css'
                ],
                dest: 'build/origin/app/css/app.css'
            },
            cssLib: {
                options: {
                    separator: '\n'
                },
                src: [
                    'node_modules/bootstrap/dist/css/bootstrap.min.css',
                    'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
                    'node_modules/angularjs-toaster/toaster.min.css'
                ],
                dest: 'build/origin/lib/app.lib.css'
            }
        },
        processhtml: {
            options: {},
            dist: {
                files: [
                    { 'build/origin/index.html': ['index.html']}
                ]
            }
        },
        browserSync: {
            bsFiles: {
                src: [
                    '*.html',
                    'css/*.css',
                    'app/*.js',
                    'app/**/*.html',
                    'app/**/**/*.html',
                    'app/**/**/**/*.html',
                    'app/**/*.js',
                    'app/**/**/*.js',
                    'Gruntfile.js'
                ]
            },
            options: {
                debounceDelay: 1000,
                debugInfo : true,
                server: {
                    baseDir: './',
                    middleware: [
                        modRewrite([
                          '!\\.|\\.html$\\w+$ /index.html [L]'
                        ])
                    ],
                    index: "index.html"
                }
            }
        },
        uglify: {
            jsFiles: {
              files: {
                'build/origin/app/js/app.js': ['build/origin/app/js/app.js'],
                'build/origin/lib/app.lib.js' : ['build/origin/lib/app.lib.js']
              }
            }
        },
        cssmin: {
            cssFiles: {
                files: [{
                    expand: true,
                    cwd: 'build/origin/lib',
                    src: 'app.lib.css',
                    dest: 'build/origin/lib'
                },{
                    expand: true,
                    cwd: 'build/origin/app/css',
                    src: 'app.css',
                    dest: 'build/origin/app/css'
                }]
            }
        },
        ngtemplates: {
            origin: {
                cwd: 'app',
                src: ['**/**.html', '**/**/**.html'],
                dest: 'build/origin/app.templates.js',
                options: {
                    url: function(url) {
                        return 'app/' + url;
                    }
                }
            }
        },
        jsdoc : {
            dist : {
                src: ['app/*.js', 'app/**/*.js', 'app/**/**/*.js'],
                options: {
                    destination: 'doc'
                }
            }
        }
	});

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-sass'); //For compiling sass to css
    grunt.loadNpmTasks('grunt-contrib-watch'); // For keeping track of changed files
    grunt.loadNpmTasks('grunt-contrib-concat'); // For concatinating js and css files
    grunt.loadNpmTasks('grunt-contrib-uglify'); // For minifying js files
    grunt.loadNpmTasks('grunt-contrib-cssmin'); // For minifying css files
    grunt.loadNpmTasks('grunt-processhtml'); // For generating index file for production with single js and css file 
    grunt.loadNpmTasks('grunt-contrib-copy'); // To copy default static folder in build 
    grunt.loadNpmTasks('grunt-angular-templates'); // For loading templates
    grunt.loadNpmTasks('grunt-browser-sync'); // For running code on your browser

    // Default task(s)
    grunt.registerTask('default', ['sass','browserSync']);
    grunt.registerTask('prod', ['watch']);
    // grunt.registerTask('dev', ['watch:dev']);
}