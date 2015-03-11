'use strict';
//llamamos a nuestros controladores segun la rutas requeridas recuerda que el codigo no corren en paralelo
var uasuarios = require('../../webapp/controladores/usuarios.srv.controlador'),
	posts = require('../../webapp/controladores/posts.srv.controlador');
module.exports = function(webapp) {
	//creamos las rutas para nuestras publicaciones
	webapp.route('/posts')
		.get(posts.list)
		//le indicamos que se necesita logeo para crear publicaciones
		.post(usuarios.requiresLogin, posts.create);

	webapp.route('/posts/:postsId')
		.get(post.read)
		//configuramos la rutas para actualizar y elimianar publicaciones como vemos es muy sencillo en express
		.put(usuarios.requiresLogin, post.hasAuthorization, post.update)
		.delete(usuarios.requiresLogin, posts.hasAuthorization, posts.delete);
		//y param tenemos un crud sencillo bueno las rutas
	webapp.param('postsId', posts.postsByID);
};
