'use strict';

//modulos

var enable = require('./sets/enable')(),
	ctrl = ('./sets/ctrl'),
	mongoose = require('mongoose'),
	chalk = require('chalk');
/**
// Aplicación principal, tener  en cuenta que el orden de carga es importante
// es muy importaten verificar primero el cervicio de la base de datos
*/
/*
//creamos una variable con los parametros de la conexion ubicados 
//en la configuraciones dentro del sistema
*/
var db = mongoose.connect(ctrl.db.uri, ctrl.db.options, function(error) {
	if (error) { // en caso de un error  lanza una alerta en consola  roja mongo no conectado
		console.error(chalk.red('No se establecio conexion a la base de datos MongoDB'));
		console.log(chalk.red(error));
	}
});
//sets = configuraciones  de desarrollo
//on = iniciar  procesos
//ctrl = configuraciones del sistema

//encender las conexiones a la base de datos  en caso de eorro indicarlo
mongoose.connection.on('error', function(error) {
	console.error(chalk.red('codigo de error de MongoDb: ' + error));

	process.exit(-1);
});
/*
// iniciar  la aplicacion en servidor y su establecer la base de datos como 
// parte de servidor en el segundo proceso de arranque 
*/
var webapp = require('./sets/servidor')(db);

// configuraciones de de passport con etrategias de acceso y bd

require('./sets/passport')();

// arranca la aplicacion en el puerto desde configuraciones

webapp.listen(ctrl.port);

//exportamos la aplicacion como modulo

exports = module.exports = webapp;

//registro de inicialización 

console.log('···');

console.log(chalk.green(ctrl.webapp.title + 'logre iniciar correctamente la aplicacion'));
console.log(chalk.green('La plataforma en que se desarolla es: \t\t\t' + process.env.NODE_ENV));
console.log(chalk.green('Estamos conectado en el siguiente puerto:\t\t\t' + ctrl.port));
console.log(chalk.green(' Se configuro y conecto correctamente la siguiente base de datos\t\t\t' + ctrl.db.uri));
if (process.env.NODE_ENV === 'seguro') {
	console.log(chalk.green('Sirviendo el prtocolo HTTPS \t\t\t  por: '));
}
console.log('···')