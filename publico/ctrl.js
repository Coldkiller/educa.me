'use strict';
//configuramos nuestro modulo para la app en angular
var ConnfigApp = (function(){
	var NombreModuloApp = 'educame';
	var AppVendorDepend = ['nsResource', 'ngAnimate', 'ui.router', 'ui.bootstrap', 'ui.utils'];
	//agragamos un modulo nuevo
	var registraModulo = function(moduleName, dependencies){
		angular.module(NombreModuloApp).requires.push(moduleName);
	};
	return{
		NombreModuloApp: NombreModuloApp,
		AppVendorDepend: AppVendorDepend,
		registraModulo: registraModulo
	};
})();