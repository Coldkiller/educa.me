'use strict';

//declaramos modulos y depndencias

var _ = require('lodash');
var glb = require('glob');

// Cargamos las configuraciones de nuestra aplicacion

module.exports = _.extend(
	require('./env/todo'),
	require('./env' + process.env.NODE_ENV) || {});

// arrastrando archivos por medio de glob y sus patrones

module.exports.getGlobbedFiles = function(globPatterns, removeRoot) {
		//alterna segun el contexto
		var _this = this;

		//carpetas de las urls de regex
		var urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

		//sacamos un array
		var salida = [];

		// si encuntras patrones recursivos comparalos con el array de glb
		if (_.isArray(globPatterns)) {
			globalPatterns.forEach(function(globPatterns)) {
				salida = _.union(salida, this.getGlobbedFiles(globPattern, removeRoot));
			});
	} else if (_.isString(globPatterns)) {
		if (urlRegex.test(globPatterns)) {
			salida.push(globPatterns);
		} else {
			glb(globPatterns, {
				sync: true
			}, function(err, fls) {
				if (removeRoot) {
					fls = fls.map(funtion(file) {
						return file.replace(removeRoot, '');
					});
				}
				salida = _.union(salida, fls);
			});
		}
	}
return salida;

};

// cargamos nuestros modulos desde los ficheros de  Js
module.exports.getJavaScriptsAssets = function(includeTests) {
	var salida = this.getGlobbedFiles(this.assets.lib.js.concat(this.assets.js), 'publico/');
	//inclumos un testeo con los argumentos de las configuraciones
	if (includeTests) {
		salida = _.union(salida, this.getGlobbedFiles(this.assets.tests));
	}
	return salida;
};


// cargamos nuestros ficheros de  CSS

module.exports.getCSSAssets = function() {
	var salida = this.getGlobbedFiles(this.assets.lib.css.concat(this.assets.css), 'publico/');
	return salida;
};