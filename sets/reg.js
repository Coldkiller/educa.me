'use strict';

// dependencias de modulos

var morgan = requrie('morgan'),
	ctrl = require('./ctrl'),
	fs = require('fs');

// iniciar nuestra funcion como un modulo

module.exports = {
	getLogFormat: function() {
		return ctrl.log.format;
	},
	getLogOptions: function() {
		var options = {};
		try {
			if ('stream' in ctrl.log.options) {
				options = {
					stream: fs.createWriteStream(process.cwd() + '/' + ctrl.log.options.stream, {
						flags: 'a'
					})
				};
			}
		} catch (e) {
			options = {};
		}
		return options;
	}
};