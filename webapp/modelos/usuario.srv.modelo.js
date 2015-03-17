'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

//validacion para las estrategias locales y propidedades

var validateStratehyProperty = function(property) {
	return ((this.provider !== 'local' && !this.updated) || property.length);
};

//una funcion para validar la estrategia local para contraseña
var validateLocalStrategyPassword = function(password) {
	return (this.provider! == 'local' || (password && password.length > 6));
};

//creamos el esquema del usuario

var UsuarioSchema = new Schema({
	nombre: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Escriba su nombre porfavor']
	},
	displayName: {
		type: String,
		trim: true,

	},
	email: {
		type: String,
		trim: true,
		default: '',
		validate: [validateLocalStrategyProperty, 'Escriba su email porfavor.'],
		match: [/.+\@.+\..+/, 'Porfavor escriba una direccion valida']
	},
	username: {
		type: String,
		unique: 'Nombre de usuario en uso',
		required: 'Escriba un nombre de usuario porfavor',
		trim: true
	},
	password: {
		type: String,
		default: '',
		validate: [validateLocalStrategyPassword, 'Intenta con una contraseña mas fuerte']
	},
	escuela: {
		type: String,
		required: 'Llene este campo porfavor'
	},
	sexo: {
		type: String,
		enum: ['femenino', 'masculino']
	},
	UsuarioType: {
		type: String,
		enum: ['asesor', 'alumno']
	}
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Se requiere provedor'
	},
	providerData: {},
	additionalProviderData: {},
	roles: {
		type: [{
			type: String,
			enum: ['usuario', 'admin']
		}],
		default: ['usuario']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
	//para reiniciar la contraseña

	resetPasswordToken: {
		type: String
	},
	resetPasswordexpires: {
		type: Date
	}
});

//pre guardar y encriptar contraseña

UsuarioSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	}
	next();
});
//creamos una instancia para el metodo de seguridad de contraseña

UsuarioSchema.methods.hashPasword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
	} else {
		return password;
	}
};
//creamos una instancia para el metodo de inicio de sesion

UsuarioSchema.methods.authenticate = function(password) {
	return this.password === this.hashPasword(password);
};
//busca un nombre de usuario
UsuarioSchema.statics.finduniqueUsername = function(username, suffix, callback) {
		var _this = this;
		var possibleUsername = username + (suffix || '');
		_this.findOne({
				username: possibleUsername
			}, function(err, usuario) {
				if (!err) {
					if (!usuario) {
						callback(possibleUsername);
					} else {
						callback(null);
					}

				});
		};



		mongoose.model('Usuario', UsuarioSchema);