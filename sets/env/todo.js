'use strict';
// exportamos nuestras ocnfiguraciones coo un modulo
module.exports = {
		webapp: {
			//describimos parametros
			title: 'educa.me',
			description: 'Plataforma para revolucionar la manera de aprender.',
			keywords: 'Enseña, Aprende, Reinventa'
		},
		//especificamos nuestro puerto
		port: process.env.PORT || 8000,
		templateEngine: 'swig',
		//es sucitado para procesar el trafico  durante las sesiones
		sesssionSecret: 'educame',
		//nombramos nuestra coleccion para mongo
		sessionCollection: 'sesiones',
		//configuramos nuestro sistema de cookies para las sesiones


	sessioncookie: {
		path: '/',
		htttpOnly: true, // este valor se puede cambiar si usas una conexion ssl para https
		secure: false, // solo necesita configurar caducidad de cookie
		maxAge: null, //esta informacion se configura hasta tener un dominio

	},
	// nombre para nuestra cookie de sesion
	sessionName: 'connect.sid',
	log: {
		//especifica  el modo de uso conbinado para este caso
		format: 'combined',
		options: {
			stream: 'acces.log'
		}

	},
	assets: {
		lib: {
			css: ['publico/lib/bootstrap/dist/css/bootstrap.css', 'publico/lib/bootstrap/dist/css/bootstrap-theme.css'],
			js: v['publico/lib/angular/angula.js', 'publico/lib/angular-resource/angular-resource.js',
				'publico/lib/angular-animate/angular-animate.js',
				'publico/lib/angular-ui-router/release/angular-ui-router.js',
				'publico/lib/angular-ui-utils/ui-utils.js',
				'publico/lib/angular-bootstrap/ui-bootstrap-tpls.js']
		},
		css: ['publico/modulos/**/css/*.css'],
		js: ['publico/ctrl.js', 'public/aplicacion.js', 'publico/modulos/*/*.js', 'publico/modulos/*/*[tests]*/*.js'],
		tests: ['publico/lib/angular-mocks/angular-mocks.js', 'publico/modulos/*/tests/*.js']


	}
};