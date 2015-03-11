'use strict';

var _= require('lodash');

erroHandler = require('../errores.srv.controlador'),
passport = require('passport'),
mongoose= require('mongoose'),
Usuario = mongoose.model('Usuario'),
ctrl = require('../../../sets/ctrl'),
nodemailer = require('nodemailer'),
async = require('crypto');

var smtpTransport = nodemailer.createTransport(ctrl.mailer.options);

exports.forgot = function(req ,res, next){
	async.waterfall([
		function(done) {
			crypto.randomBytes(20, function(err, buffer){
				var token = buffer.toString('hex');
				done (err, token);
			});
		}, function(token, done){
			if(req.body.username) {
				Usuario.findOne({
					
				})
			}
		}])
}