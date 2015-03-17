'use strict';
var _ = require('lodash'),
	mongoose = require('mongoose'),
	errorHandler = require('./errores.srv.controlador'),
	Post = mongoose.model('Post');


//crear una publicacion
exports.create = function(req, res) {
	var post = new Post(req.body);
	post.usuario = req.usuario;

	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

//mustrame la publicacion actual
exports.read = function(req, res) {
	res.json(req.post);
};

//actualizar un articulo
exports.update = function(req, res) {
	var post = req.post;
	post.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

//eliminar un articulo
exports.delete = function(req, res) {
	var post = req.post;
	post.remove(funtion(err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(post);
		}
	});
};

//lista de publicaciones
exposrts.list = function(req, res) {
	Post.find().sort('-creado').populate('usuario', 'displayName').exec(function(err, posts) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(posts;)
		}
	});
};

//mediador
exports.postByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Publicacion no apta'
		});
	}
	Post.findById(id).populate('usuario', 'displayName').exec(function(err, post) {
		if (err) return next(err);
		if (!post) {
			return res.status(400).send({
				message: 'No se encuentra disponible'
			});
		}
		req.post = post;
		next();
	});

};

//verificamos autorizacion para usuarios
exports.hasAuthorization = function(req, res, next) {
	if (req.post.usuario.id !== req.usuario.id) {
		return res.status(403).send({
			message: 'No se autoriza la accion'
		});
	}
	next();
};