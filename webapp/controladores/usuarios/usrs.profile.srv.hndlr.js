'use strict';

var _ = require('lodash'),
	errorHandler = require('../errores.srv.controlador'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	Usuario = mongoose.model('Usuario');
//creamos una funcion para actualizar info de perfil
exports.update = function(req, res) {
	//arranca
	var Usuario = req.usuario;
	var message = null;

	//para seguridad removemos los roles del objeto req.body
	delete req.body.roles;
	if (usuario) {
		usuario = _.extend(usuario, req.body);
		usuario.updated = Date.now();
		user.displayName = usuario.nombre + ' ' + usuario.apellido;
		usuario.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(usuario, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.josn(usuario);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'Necesitas iniciar sesion'
		});
	}
};
//exportamos al usuario
exports.yo = funtion(req, res) {
	res.josn(req, usuario || null);
};