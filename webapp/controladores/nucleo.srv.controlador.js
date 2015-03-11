'use strict';
//creamo un indice para nuestro servidor http y renderizamos la peticion
exports.index = function(req, res) {
	res.render('index', {
		usuario: req.usuario || null,
		request: req
	});
};