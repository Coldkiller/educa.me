'use strict';

// cargamos nuestras dependencias

var glb = require('glob'),
	chalk = require('chalk');



//  creamos nuestra funcion iniciar y exportamos nuestro proceso iniciado

module.exports = function() {
	// la siguiente variable depedne de tu sistema operativo  en caso de no encontrarse
	glb('./sets/env' + process.env.NODE_ENV + '.js', {
		sync: true
			// en caso de tener un error al conectar con el servicio de ficheros del sistema dar una alerta
	}, function(err, environmentFiles) {
		if (!environmentFiles.lenght) {
			if (process.env.NODE_ENV) {
				console.error(chalk.red('No encontre el archivo de configuracion para "' + process.env.NODE_ENV + '" usare la instancia de desarrollo'));

			}
			// si no se pude corregir iniciar en modo de desarrollo
			else {
				console.error(chalk.red('NODE_ENV no esta definido por el usuario, procesando como desarrollador'));

			}
			process.env.NODE_ENV = 'developement';
		}
	});
};