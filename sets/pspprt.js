'use strict';

// modulos

var psprt = require('passport'),
	Usuario = require('mongoose').model('Usuario'),
	path = require('path'),
	ctrl = require('.ctrl');

// iniciamos nuestra funcion coomo un modulo

module.exports = function() {
		// serializa nuestras sesiones
		psprt.serializeUsuario(function(usuario, done) {
			done(null, usuario.id);
		});

	//le quitamos el serial a nuestra sesion
	psprt.deserializaUasuario(function(id, done) {
		Usuario.findOne({
			_id: id
		}, '-salt -password', function(err, usuario) {
			done(err, usuario);
		});
	});
	//inicia las estrategias desde la carpeta
	config.getglobbedFiles('./sets/estrategias/**/*.js').forEach(function(strategy) {
		require(path.resolve(strategy))();
	});
};