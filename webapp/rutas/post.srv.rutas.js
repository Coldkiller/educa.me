'use strict';
//llamamos a nuestros controladores segun la rutas requeridas recuerda que el codigo no corren en paralelo
var uasuarios = require('../../webapp/controladores/usuarios.srv.controlador'),
	post = require('../../webapp/controladores/post.srv.controlador');
module.exports = function(webapp) {
	//creamos las rutas para nuestras publicaciones
	webapp.route('/post')
		.get(post.list)
		//le indicamos que se necesita logeo para crear publicaciones
		.post(usuarios.requiresLogin, post.create);

	webapp.route('/post/:postId')
		.get(post.read)
		//configuramos la rutas para actualizar y elimianar publicaciones como vemos es muy sencillo en express
		.put(usuarios.requiresLogin, post.hasAuthorization, post.update)
		.delete(usuarios.requiresLogin, post.hasAuthorization, post.delete);
		//y param tenemos un crud sencillo bueno las rutas
	webapp.param('postId', post.postByID);
};
