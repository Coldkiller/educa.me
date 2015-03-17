'use strcit';

var _ = require('lodash'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Usuario = mongoose.model('Usuario');

//bueno aqui inicia nuestro manejador de logeo 

//primero por el registro de usuarios

exports.registrar = function(req, res) {
	delete.req.body.roles;
	//por seguridad eliminamos nuestro rol dentro de este objeto


	//arranca mis variables

	var usuario = new Usuario(req.body);
	var message = null;
	//agregamos info del usuario
	uasuario.provider = 'local';
	usuario.displayName = usuario.nombre + '' + usuario.apellido;

	//procedemos a guardar a nuestro usuario
	usuario.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			usuario.password = undefined;
			usuario.salt = undefined;
			req.login(usuario, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(usuario);
				}
			});
		}
	});

};

//creamos nuestro controlador para entrar o iniciar sesion 
exports.entrar = function(req, res, next) {
	passport.authenticate('local', function(err, usuario, info) {
		if (err || !usuario) {
			res.status(400).send(info);
		} else {
			usuario.password = undefined;
			usuario.salt = undefined;
			req.login(usuario, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(usuario);
				}
			});
		}
	})(req, res, next);
};


//salir del sitio
exports.salir = function(req, res) {
	req.logout();
	res.redirect('/');
};

//callback para passport 
exports.oauthCallback = function(strategy) {
	return function(req, res, next) {
		passport.authenticate(strategy, function(err, usuario, redirectURL) {
			if (err || !usuario) {
				return res.redirect('/#!/entrar');
			}
			req.login(usuario, function(err) {
				if (err) {
					return res.redirect('/#!/entrar');
				}
				return res.redirect(redirectURL || '/');
			});
		})(req, res, next);
	};
};

//funciones de ayuda para guardar y actualizar un perfil de usuario
exports.saveOAuthUserProfile = function(req, providerUserProfile, done) {
		if (!req.usuario) {
			//no entendi bien esto en la api pero sencibiliza los resultados de busqueda
			var serchMainProviderIndentifierField = 'provideData.' + providerUserProfile.providerIdentfierField;
			var serchAdditionalProviderIdentifierField = 'additionalProvidersData.' + providerUserProfile.provider + '.' + providerUserProfile.providerIdentfierField;
			//definimos al provedor 
			var mainProviderSearchQuery = {};
			mainProviderSearchQuery[searchMainProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentfierField];

			//define provedores adicionales de busqueda
			var additionalProviderSearchQuery = {};
			additionalProviderSearchQuery[searchAdditionalProviderIdentifierField] = providerUserProfile.providerData[providerUserProfile.providerIdentfierField];
			//definimos las busqueda para encontrar pefles ya existentes
			var searchQuery = {
				$or: [mainProviderSearchQuery, additionalProviderSearchQuery]
			};
		//creamos una funcion para buscar usuarios existentes
		Usuario.findOne(searchQuery, function(err, usuario) {
			if (err) {
				return done(err);

			} else {
				if (!usuario) {
					var possibleUsername = providerUserProfile.username || ((providerUserProfile.email) ? providerUserProfile.email.split('@')[0] : '');
					Usuario.findUniqueUsername(possibleUsername, null, function(avaibleUsername) {
						usuario = new Usuario({
							nombre: providerUserProfile.firstName,
							apellido: providerUserProfile.lastName,
							username: availableUsername,
							displayName: providerUserProfile.displayName,
							email: providerUserProfile.email,
							provider: providerUserProfile.provider,
							providerData: providerUserProfile.providerData
						});
						//todo esto para guardar un usuario
						usuario.save(function(err) {
							return done(err, usuario);
						});
					});
				} else {
					return done(err, ussuario);
				}
			}
		});
} else {		//que hacer si un usuario ya se conecto con una cuenta ya conocida
		var usuario = req.usuario;

		//revisa si el usuario ya existe, en caso de que si pregunta si dese agregar otro provedor de datos adicional
		if (usuario.provider !== providerUserProfile.provider && (!usuario.additionalProvidersData || !usuario.additionalProviderData[providerUserProfile.provider])) {
			//agregamos los datos adiconales del nuevo provedor
			if (!usuario.additionalProvidersData) usuario.additionalProvidersData = {};
			usuario.additionalProvidersData[providerUserProfile.provider] = providerUserProfile.providerData;

			//le informamos a mongo que desemos guardar los nuevos datos en la bd
			usuario.markModified('additionalProvidersData');
			//todo esto para obtener un perfil
			usuario.save(function(err) {
				return done(err, usuario, '/#!/sets/cuentas');
			});
		} else {
			return done(new Error('Lo sentimos pero este usuario ya se registro con tu provedor'), usuario);
		}
	}
};

//eliminar un provedor de datos
export.removeOAuthProvider = function(req, res, next) {
		var usuario = req.usuario;
		var provider = req.param('provider');

		if (usuario && provider) {
			//elimina provedores adicionales
			delete.usuario.additionalProvidersData[provider];
			//avisamos a mongo que actualize la bd con los cambios realizados
			usuario.markModified('additionalProvidersData');
		}
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
					res.json(usuario);
				}
			});
		}
	});
};








