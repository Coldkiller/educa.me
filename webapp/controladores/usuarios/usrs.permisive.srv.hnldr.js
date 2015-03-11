'use strict';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	Usuario = mongoose.model('Usuario');

//mediador de nuestro usuario

exports.usuarioByID = function(req, res, nex, id) {
	Usuario.findById(id).exec(function(err, usuario) {
		if (err) return next(err);
		if (!usuario) return next(new Error('Ups, no se pudo cargar el usuario: ' + id));
		req.profile = usuario;
	});
};
//funcion para solicitar logeo

exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'Necesitas ser usuario'
		});
	}
	next();
};
//nuestra funcion para autorizar
exports.hasAuthorization = function(roles) {
	var _this = this;
	return function(req, res, function() {
		if (_.intersection(re.usuario.roles, roles).length) {
			return next();
		} else {
			return res.status(403).send({
				message: 'usuario no autorizado'
			});
		}
	});
};