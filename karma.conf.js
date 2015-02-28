'use strict';

// dependencias

var applicationConfiguration = require('./configuraciones/configuracion');

// configuracion de karma 
module.exports = function(configuracion) {
	configuracion.set({
		// frame a usar
		frameworks: ['jasmine'],
		// lista de archivos patrones a cargar en el navegador 
		files: applicationConfiguration.assets.lib.js.concat(applicationConfiguration.assets.js, applicationConfiguration.assets.tests),

		// reporte de resultados
		reporters: ['progress'],

		// puerto del servidor 
		port: 9876,

		//habilitar colores para los resultados
		colors: true,

		// nivelde registro
		logLevel: config.LOG_INFO,

		//ver archivo y ejecución de pruebas siempre que  se hagan cambio en los archivos
		autoWtch: true,

		//navegador de pruebas

		browsers: ['PhantomJS'],
		//Si el navegador no captura en tiempo de espera dado [ ms] , detenlo
		captureTimeout: 80000,
		//El modo de integración continua
		// Si es verdad, capturar navegadores, pruebas realizadas y salir
		singleRun: true



	});
};