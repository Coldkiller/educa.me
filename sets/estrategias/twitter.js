'use strict';
//nuestros modulos desde la libreia original
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy,
	ctrl = require('../ctrl'),
	usuarios = require('../../webapp/controladores/usuarios.srv.controlador');
//creamos una funcion para tratar a nuestra configuracion de strategia
module.exports = function() {
		passport.use(new TwitterStrategy({
						consumeKey: ctrl.twitter.clientID,
						consumerSecret: ctrl.twitter.clientSecret,
						callbackURL: ctrl.twitter.callbackURL,
						passReqToCallback: true
					},
	//crea una funcion para tratar la informacion obtenida del api de twitter
	function(req, token, tokenSecret, profile, done) {
		//en la api de passport se encuentra la estrategia para los datos de twtter
		//el perfil lo podemos obtener en Json
		var providerData = profile._json;
		//generamos un token para nuestro provedor de datos
		providerData.token = token;
		providerData.tokenSecret = tokenSecret;
		// esto es igual a esto

		//crear un perfil por con OAuth
		var displayName = profile.displayName.trim();
		var iSpace = displayName.indexOf('');
		var firstName = iSpace !== -1 ? displayName.substring(0, iSpace) : displayName;
		var lastName = iSpace !== -1 ? displayName.substring(iSpace + 1) : '';

// obtenemos nuestro perfil de nuestro provedor


var providerUserProfile = {
	nombre: firstName,
	apellido: lastName,
	displayName: displayName,
	nick: profile.username,
	provider: 'twitter',
	providerIdentifierField: 'id_str',
	providerData: providerData
};
//guardamos nuestro perfil
usuarios.saveOAuthUserProfile(req, providerUserProfile, done);

}));

};