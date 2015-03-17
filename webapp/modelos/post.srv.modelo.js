'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PostSchema = new Schema({
	creado: {
		type: Date,
		default: Date.now

	},
	titulo: {
		type: String,
		default: '',
		trim: true,
		required: 'Debes escribir un titulo'
	},
	contenido:{
		type: String,
		default: '',
		trim: true
	},
	usuario: {
		type: Schema.ObjectId,
		ref: 'Usuario'
	}
});
mongoose.model('Post', PostSchema);