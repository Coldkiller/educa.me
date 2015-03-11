'use strict';
//llamamos al modulo de passport para facebook
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy,
	ctrl = require('../ctrl'),
	usuarios = require('../../webapp/controladores/usuarios.srv.controlador');

module.exports = function() {
		//esta es nuestra funcion para tratar la estrategia de passport
	passport.use(new FacebookStrategy({
					clientID: ctrl.facebook.clientID,
					clientSecret: ctrl.facebook.clientSecret,
					callbackURL: ctrl.facebook.callbackURL,
					passReqToCallback: true
				},
	function(req, accesToken, refreshToken, profile, done) {
		//accedemos al perfil del usuario ver estrategiaen el api de passport
		var providerData = profile._json;
		var providerUserProfile = {
			nombre: profile.name.giveName,
			apellido: profile.name.familyName,
			displayName: profile.displayName,
			email: profile.emails[0].value,
			nick: profile.username,
			provider: 'facebook',
			providerIndentifierField: 'id',
			providerData: providerData
		};
		// guardamos nuestro pefil
usuarios.saveOAuthUserProfile(req, providerUserProfile, done);
}));

};