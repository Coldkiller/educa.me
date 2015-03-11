'use strict';

var passport = require('passport'),

	LocalStrategy = require('passport-local').Strategy,
	Usuario = require('mongoose').model('Usuario');
//integramos una funcion para tratar nuestra estrategia local
module.exports = function() {
		passport.use(new LocalStrategy({
						usernameField: 'nick',
						passwordField: 'password'
					},
					function(nick, password, done) {
						Usuario.findOne({
									nick: username
								}, function(err, usuario) {
									if (err) {
										return done(err);
									}
			//creamos una alerta para cuando se encuentren coincidencias
			if (!usuario) {
				return done(null, false, {
					message: 'Usuario desconocido o la contraeña es incorrecta'
				});
			}
			if (!usuario.authenticate(password)) {
				return done(null, false, {
					message: 'Usuario no identificado o la contraseña es incorrecta'
				});
			}
			return done(null, usuario);
		});
}));
};