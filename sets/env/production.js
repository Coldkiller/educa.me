'use strict';

module.exports = {
		db: {
			uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.envDB_1_PORT_27017_TCP_ADDR || 'localhost') + '/educa',
			options: {
				user: '',
				pass: ''
			}
		},
		log: {
		//especifica el formato
		format: 'combined',
		options: {
			stream: 'acces.log'
		}
	},
	assets: {
		lib: {
			css: ['publico/lib/bootstrap/dist/css/bootstrap.min.css',
				'publico/lib/bootstrap/dist/css/bootstrap-theme.min.css',
			],
			js: ['publico/lib/angular/angular.min.js',
				'publico/lib/angular-resource/angular-resource.min.js',
				'publico/lib/angular-animate/angular-animate.min.js',
				'publico/lib/angular-ui-router/release/angular-ui-router.min.js',
				'publico/lib/angular-ui-utils/ui-utils.min.js',
				'publico/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
			]
		},
		//no recuerdo si es aplicacion o stylo.min.css
		css: 'publico/dist/aplicacion.min.css',
		js: 'publico/dist/aplicacion.min.js'

	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: proces.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientsSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'auth/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};