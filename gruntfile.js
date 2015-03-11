'use strict';
//configuramos el modulo de grunt ´para testear nuestra aplicacion
module.exports = function(grunt) {
		var watchFiles = {
			//carpetas de vistas y archivos de js que se testearan
			serverViews: ['webapp/vistas/**/*.*'],
			serverJS: ['gruntfile.js', 'webapp.js', 'sets/**/*.js', 'webapp/**/*.js', '!webapp/tests/'],
			clientViews: ['publico/modulos/**/vistas/**/*.html'],
			clientJS: ['publico/js/*.js', 'publico/modulos/**/*.html'],
			clientCSS: ['publico/modulos/**/*.css'],
			mochaTests: ['webapp/tests/**/*.js']
		};
		//configura el proyecto

		grunt.initConfig({
					pkg: grunt.file.readJSON('package.json'),
					//configuramos un observador para cada archivo en las carpetas 
					watch: {
						//para el servidor de vistas
						serverViews: {
							files: watchFiles.serverViews,
							options: {
								liverload: true
							}
						},
						// para el servidor JavaScript
						serverJS: {
							files: watchFiles.serverJS,
							tasks: ['jshint'],
							options: {
								liverload: true
							}


						},
						// para nuestros archivos Js desde el cliente
						clientJS: {
							files: watchFiles.clientJS,
							tasks: ['jshint'],
							options: {
								liverload: true
							}
						},
						// para nuestros archivos css usaremos csslint para testeo
						clientCSS: {
							files: watchFiles.clientCSS,
							tasks: ['csslint'],
							options: {
								liverload: true
							}
						},
						//configuramos mocha 
						mochaTests: {
							files: watchFiles.mochaTests,
							tasks: ['test:webapp'],
						}
					},
		// configuramos nuestros entornos de testeo
		//primero jshint e indicamos archivos de reportes
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true
				}
			},
			// para css lint preparamos la instancia
			csslint: {
				options: {
					csslintrc: '.csslintrc'
				},
				all: {
					src: watchFiles.clientCSS
				}
			},
			// por minificacion usaremos ugli 
			uglify: {
				production: {
					options: {
						mangle: false
					},
					files: {
						'publico/dst/aplicacion.min.js': 'publico/dst/aplicacion.js'
					} // indicamos la ubicacin de nuestros archivos
				}
			},
			// minificamos el css y damos nuestras carpetas de salida
			cssmin: {
				combine: {
					files: {
						'publico/dst/estylo.min.css': '<%= estyloCSSFiles %>'
					}
				}
			},

			// configura el test para node.js
			nodemon: {
				dev: {
					script: 'webapp.js',
					options: {
						nodeArgs['--debug'],
							ext: 'js, html',
							watch: watchfiles.serverViews.concat(watchFiles.serverJS)
					}
				}
			},
			'node-inspector': {
				custom: {
					//cargamos nuestras configuraciones 
					options: {
						'web-port': 1323,
						'web-host': 'localhost',
						'debug-port': 5858,
						'save-live-edit': true,
						'no-reload': true,
						'stack-trace-limit': 23,
						'hidden': []
					}
				}
			},
			// para nuestras aplicaciones de lado del cliente
			ngAnnotate: {
				production: {
					files: {
						'publico/dst/aplicacion.js': '<%= aplicacionJavaScriptFiles %>'
					}
				}
			},
			// hacemos testeo concurrente segun el enteorno donde se corre la plataforma
			concurrent: {
				default: ['nodemon', 'watch'],
				debug: ['nodemon', 'watch', 'node-inspector'],
				options: {
					logConcurrentOutput: true,
					limit: 20
				}
			},
			// segun nuestra plataforma
			env: {
				test: {
					NODE_ENV: 'test'
				},
				secure: {
					NODE_ENV: 'secure'
				}
			},
			mochaTests: {
				src: watchfiles.mochaTests,
				options: {
					reporter: 'spec',
					require: 'webapp.js'
				}
			},
			//indicamos nuestro archivo de configuracion de karma 
			karma: {
				unit: {
					configFile: 'karma.ctrl.js'
				}
			}
		});
		//carga las etiquetas para  NodePackageManager
		require('load-grunt-tasks')(grunt);
		//marca como default  para forzar a grunt a iniciar en orden para no bloquear el proyecto

		grunt.task.registerTask('loadConfig,'
				'Etiqueta los modulos configurados en las opciones de grunt',
				function() {
			var enable = require('./sets/enable')();
			var ctrl = require('./sets/ctrl');
			grunt.ctrl.set('aplicacionJavaScriptFiles', ctrl.assets.js);
			grunt.config.set('aplicacionCSSFiles', ctrl.assets.css);

				}); grunt.resgisterTask('default', ['lint', 'concurrent:default']); grunt.resgisterTask('debug', ['lint', 'concurrent:debug']); grunt.resgisterTask('secure', ['env:secure', 'lint', 'concurrent:default']); grunt.resgisterTask('lint', ['jshint', 'csslint']); grunt.resgisterTask('build', ['lint', 'loadConfig', 'ngAnnotate', 'uglify', 'cssmin']); grunt.resgisterTask('test', ['test:webapp', 'test:client']); grunt.resgisterTask('test:webapp', ['env:test', 'mochaTest']); grunt.resgisterTask('test:client', ['env:test', 'karma:unit']);

		}; // colorin colorado esto esta terminado