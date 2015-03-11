'sue strict';
module.exports = {
		port: 8443,
		db: {
			uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/educame-modo#seguro',
			options: {
				user: 'coldkiller',
				pass: 'm1l4n3z4s2305'
			}
		},
	log: {
		format: 'conbined',
		options: {
			//quitar las comillas si deseas registrar los accesos al fs
			stream: 'acces.log'
		}
	},
	assets: {
		lib: {
			css: ['publico/lib/bootstrap.min.css',
				'publico/lib/bootstrap/dist/css/bootstrap-theme.min.css'
			],
		js: [
			'publico/lib/angular/angular.min.js',
			'publico/lib/angular-resource/angular-resource.min.js',
			'publico/lib/angular-animate/angular-animate.min.js',
			'publico/lib/angular-ui-router/release/angular-ui-router.min.js',
			'publico/lib/angular-ui-utils/ui-utils.min.js',
			'publico/lib/angular-bootstrap/ui-bootstrap-tpls.min.js'
		]
	},
	css: 'publico/dist/aplicacion.min.css',
		js: 'publica/dist/aplicacion.min.js'

},
	facebook: {
		clientID: process.envFACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: 'https://localhost:443/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'TWITTER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'https://localhost:443/auth/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'

			}
		}
	}
};