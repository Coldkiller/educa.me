'use strict';

// modulos y dependencias

var fs = require('fs');
var htp = require('http');
var htps = require('https');
var frameW = require('express');
var mrgn = require('morgan');
var lgr = require('./reg');
var bodyParser = require('body-parser');
var sesion = require('express-session');
var compress = require('compression');
var mthdO = require('method-override');
var ckPrs = require('cookie-parser');
var helmet = require('helmet');
var psprt = require('passport');
var mongStr = require('connect-mongo')({
	sesion: sesion
});
var flash = require('connect-flash');
var ctrl = require('./ctrl');
var coli = require('consolidate');
var path = require('path');


module.exports = function(db) {
	//iniciamos nuestra aplicacion
	var webapp = fameW();

	//modelo de ficheros cualquier fichero javasript en la carpeta 
	ctrl.getGlobbedFiles('./webapp/modelos/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});
	// configura las  variables locales de la aplicacion desde archivo ./ctrl

	webapp.locals.title = ctrl.webapp.title;
	webapp.locals.description = ctrl.webapp.description;
	webapp.locals.keywords = ctrl.webapp.keywords;
	webapp.locals.facebookwebappId = ctrl.facebook.clientID;
	webapp.locals.jsFiles = ctrl.getJavaScriptAssets();
	webapp.locals.cssFiles = ctrl.getCSSAssets();


	//dame las urls locales del sistema 
	webapp.use(funtion(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// toma un lugar para los archivos estaticos de express

	webapp.use(compress({
		//solo comprime los archivos con estos tipos de contenido
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},
		//nivel de compresion 
		level: 2
	}));


	//muestrame si tenemos problemas 
	webapp.set('showStackError', true);

	//te indico donde esta la paltnillas de nuestro motor

	webapp.set('view engine', 'srv.vista.html');
	webapp.set('vistas', './webapp/vistas');

	//habilitamos nuestro servicio de registro de procesos

	webapp.use(mrgn(lgr.getLogFormat(), lgr.getLOgOptions()));


	//mediador entre plataforma y dependencias

	if (process.env.NODE_ENV === 'development') {
		//desabilitamos las vistas desde cache
		webapp.set('view cache', false);

	} else if (process.env.NODE_ENV === 'production') {
		webapp.locals.cache = 'memory';
	}
	//parseamos las peticiones tomando de mediador a mthdO para el cuerpo

	webapp.use(bodyParser.urlencoded({
		extended: true
	}));
	webapp.use(bodyParser.josn());
	webapp.use(mthdO());

	//utilizar a helmet para cabeceras https seguras en  Express

	webapp.use(helmet.xframe());
	//creamos un filtro xss
	webapp.use(helmet.xssFilter());
	//evitamos sniffers en la red
	webapp.use(helmet.nosnif());

	//filtramos insegusridades de ie
	webapp.use(helmet.ienoopen());
	webapp.disable('x-powered-by');

	//configuramos una ruta para los ficheros estaticos 

	webapp.use(express.static(path.resolve('./public')));

	//parsear la s cookies para el proceso de sesion

	webapp.use(ckPrs());

	//disposicion de mongo para las sesiones en express

	webapp.use(sesion({
		saveUnininitialized: true,
		resave: true,
		secret: ctrl.sessionSecret,
		store: new mongoStore({
			db: db.conncection.db,
			collection: ctrl.sessionCollection
		}),
		cookie: ctrl.sessionCookie,
		name: ctrl.sessionName
	}));
	// utilizar sesiones de passport

	webapp.use(psprt.initialize());
	webapp.use(pspprt.sesion());

	//conectar con flas para los mensajes en flash
	webapp.use(flash());

	//globaliza ficheros de ruteo

	config.getGlobbedFiles('./webapp/rutas/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(webapp);
	});

	// en caso de no encontrar nada dame un mensaje 404

	ap.use(function(err, req, res, next) {
		//indica un error si el objeto no existe
		if (!err) return next();
		//registralo
		console.error(err.stack);

		//pagina de error  500
		res.status(500).render('500', {
			error: err.stack
		});

	});

	// si deseas responder un 404 sin un mediador

	webapp.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'No se encuentra'
		});
	});
	// si la plataforma de desarrollo es segura carga por protocolo ssl
	if (process.env.NODE_ENV === 'secure') {
		//cargar certificados y llaves de protocolo 
		var privateKey = fs.fs.readFileSync('./sets/sslcerts/key.pem', 'utf8');
		var cetificado = fs.fs.readFile('./sets/sslcerts/cert.pem', 'utf8');

		//ahora si creamos un bonito servidor http seguro

		var httpsServer = htps.createServer({
			key: privateKey,
			cert: certificado

		}, webapp);
		return httpsServer;


	}
	//guardamos nuestra instnacia de express
	return webapp;

}