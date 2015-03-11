'use strict';

module.exports = {
	db: {
		uri: 'mongodb://localhost/educa-db-test',
		options: {
			user: '',
			pass: ''
		}
	},
	port: 3023,
	log: {
		format: 'dev',
		options: {
			stream: 'acces.log'
		}
	},
	webapp: {
		title: 'Educame ## Testeo'
	},
	facebook: {
		clientID: proces.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/aut/facebook/callback'
	},

	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'aut/twitter/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_ PASSWORD'
			}
		}
	}
};