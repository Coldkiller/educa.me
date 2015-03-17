'use strict';
//configuramos nuestra plicacion angular.js y sus modulos 
angular.module(ConfigApp.NombreModuloApp, ConfigApp.AppVendorDepend);
angula.module(ConfigApp.NombreModuloApp).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hasPrefix('!');
	}
]);

//creamos una funcion de inicio para arrancar la aplicacion
anguler.element(document).ready(function() {
	if (window.location.hash === '#_=_') window.location.hash = '#!';
	angular.bootstrap(document, [ConfigApp.NombreModuloApp]);
});

//la verdad no se mucho de angular pero es JavaSript si esto no funca entons es como el api indica