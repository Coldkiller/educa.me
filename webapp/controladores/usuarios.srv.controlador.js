'use strict';

var _ = require('lodash');

//extramos desde otro sitio nuestros controladores por serguridad

madule.exports = .extend(
	//maneja el logeo
	require('./usuarios/usrs.auth.srv.hndlr'),
	//meneja contraseñas
	require('./usuarios/usrs.pswd.srv.hndlr'),
	//meneja perfil
	require('./usuarios/usrs.profile.srv.hndlr'),
	//autoriza
	require('./usuarios/usrs.permisive.srv.hndlr')
);