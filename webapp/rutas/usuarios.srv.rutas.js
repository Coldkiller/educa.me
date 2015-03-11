'use strict';

var passport = require('passport');
module.exports = function(webapp) {
	var usuarios = require('../../webapp/controladores/usuarios.srv.controlador');
	//configura  el pefil de usuario segun el api
	webapp.route('/usuarios/yo').get(usuarios.me);
	webapp.route('/usuarios').put(usuarios.update);
	webapp.route('/usuarios/cuentas').delete(usuarios.removeOAuthProvider);
	//configura opcines de contraeñas de usuarios
	//de entrada y salida
	webapp.route('/usuarios/password').post(usuarios.changePassword);
	webapp.route('/auth/forgot').post(usuarios.forgot);
	
	//creamos nuestro token en caso de quere restablecer contraseña
	webapp.route('/auth/reset/:token').get(ususarios.validateResetToken);
	webapp.route('/auth/reset/:token').post(usuarios.reset);
	//creams nuestros maenjadores para la api de passport para sessiones
	webapp.route('/auth/registrar').post(usuarios.signup);
	webapp.route('/auth/entrar').post(usuarios.sigin);
	webapp.route('/auth/salir').get(usuarios.signout);
	//configuramos las rutas para facebook
	webapp.route('/auth/facebook').get(passport.authenticate('facebook', {
		scope: ['email']
	}));
	webapp.route('/auth/facebook/callback').get(usuarios.oauthCallback('facebook'));
	//configuramos las rutas para twitter
	webapp.route('auth/twitter').get(passport.authenticate('twitter'));
	webapp.route('/auth/twitter/callback').get(usuarios.oauthCallback('twitter'));
	webapp.param('usuarioId', usuarios.usuarioByID);
};