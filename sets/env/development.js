'use strict';
//configuramos nuestra base de datos
module.exports = {
	db: {
		uri: 'mongodb://localhost/educa-db',
		options: {
			user: 'coldkiller'
			pass: 'm1l4n3z4s2305'
		}
	},
	log: {
		//especifica el modo de uso
		format: ' dev',
		options: {
			stream 'acces.log'
		}
	},
	webapp: {
		title: 'Educame - plataforma de desarrollo'
	},
	//configuramos la plataforma para usar la s estrategias de passport
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbacjURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'APP_SECRET',
		callbackURL: '/auth/twitter/callback'
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