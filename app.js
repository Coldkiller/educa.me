'use strict';

//modulos

var iniciar = require('./configuraciones/iniciar')(),
	configuracion = ('./configuraciones/configuracion'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

// Aplicación principal, tener  en cuenta que el orden de carga es importante


//conexion a la base de datos
var db = mongoose.connect(configuracion.db.uri, configuracion.db.options, function(error) {
	if (error) {
		console.error(chalk.red('No se establecio conexion a la base de datos MongoDB'));
		console.log(chalk.red(error));
	}
});

mongoose.connection.on('error', function(error) {
	console.error(chalk.red('codigo de error de MongoDb: ' + error));

	process.exit(-1);
});

// iniciar la aplicacion en express
var app = require('./configuraciones/express')(db);

// configuracion de passport

require('./configuraciones/passport')();

// arranca la aplicacion en el puerto

app.listen(configuracion.port);

//exportamos la aplicacion

exports = module.exports = app;

//registro de inicialización 

console.log('···');

console.log(chalk.green(configuracion.app.title + 'aplicacion iniciada correctamente'));
console.log(chalk.green('Plataforma de desarrollo\t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Puerto\t\t\t' + configuracion.port));
console.log(chalk.green('Base de datos \t\t\t' + configuracion.db.uri));
if (process.env.NODE_ENV === 'seguro') {
	console.log(chalk.green('HTTTPS \t\t\t  en '));
}
console.log('···')


