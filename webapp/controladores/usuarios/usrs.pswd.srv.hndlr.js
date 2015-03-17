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
					username: req.body.username
				}, '-salt -password', function(err, usuario){
					if (!usuario){
						return res.status(400).send({
							message: 'No se encontro ninguna cuenta de usuaro con este nombre de usuario'
						});
					} else if (usuario.provider !== 'local') {
						return res.status(400).send({
							message: 'Ya te has registrado usando la siguiente cuenta: '	+ usuario.provider 
												});
					}else {
						usuario.resetPasswordToken = token;
						usuario.resetPasswordExpires = Date.now() + 2392051;
						usuario.save(function (err){
							done(err, token, usuario);
						});
					}
				});
			}else { return res.status(400).send({
				message: 'El campo de nombre de usuario no debe estar vacio!'
			});

			}, function(emailHTML, usuario, done) {
				var mailOptions ={
					to: usuario.mail,
					from: ctrl.mailer.from,
					subject:'Cambio de contraseña',
					html: emailHTML
				};
				smtpTransport.sendMail(mailOptions, function(err){
					if(!err) {
						res.send({
							message: 'Se envio un correo la siguiente direccion:' + usuario.mail + 'revisa tu bandeja, gracias!'
						});
					}else {
						return res.status(400).send({
							message: 'Ups, lo sentimos fallamos al enviar el correo'
						});
					}
					done(err);
				});
			}

		], function(err){
			if (err) return next(err);
		});
};

//reiniciar la contraseña desde el token en el email

exports.validateResetToken =  function(req, res) {
	Usuario.findOne({
		resetPasswordToken: req.params.token,
		resetPasswordExpires:{
			$gt: Date.now()
		}
	}, function(err, usuario){
		if(!usuario) {
			return res.redirect('/#!/password/restabl/invalido');
		}
		res.redirect('/#!/password/restabl/' + req.params.token);
	});
};
//post reiniciar contraeña desde token enviado en el correo

exports.reset = function(req, res, next) {
	var passwordDetails = req.body;
	async.waterfall([
		function(done){
			Usuario.findOne({
				resetPasswordToken: req.params.token,
				resetPasswordExpires: {
					$gt: Date.now()
				}
			}, function(err, usuario){
				if(!err && usuario){
					if (passwordDetails.newPassword === passwordDetails.verifyPassword){
						usuario.password = passwordDetails.newPassword;
						usuario.resetPasswordToken =  undefined;
						usuario.resetPasswordExpires = undefined;

						usuario.save(function(err){
							if (err){
								return res.status(400).send({
									message: erroHandler.getErrormessage(err)
								});
							}else {
								req.login(usuario, function(err){
									if(err){
										res.status(400).send(err);
									}else {
										res.json(usuario);
										done (err, usuario);

									}
								});
							}
						});
					}else {
						return res.status(400).send({
							message: 'Las contraseñas no coinciden'
						});
					}
				}else {
					return res.status(400).send({
						message: 'El token es invalido o ya caduco lo sentimos.'
					});
				}
			});
		}, function(usuario, done){
			res.render('plantillas/reset-passw-conf-mail', {
				name: usuario.displayName,
				webappName: ctrl.webapp.title
			}, function (err, emailHTML){
				done(err, emailHTML, usuario);
			});
		},
		function(emailHTML, usuario, done){
			var mailOptions = {
				to: usuario.mail,
				from:ctrl.mailer.from,
				subject: 'Se cambio correctamente tu contraseña',
				html: emailHTML
			};
			smtpTransport.sendMail(mailOptions, function(err){
				done(err, 'done');
			});
		} ], function(err){
			if(err)return next(err);
		});
};
//cambia la contraseña

exports.changePassword = function (res. req){
	var passwordDetails = req.body;

	if(re.usuario){
		if (passwordDetails.newPassword){
			Usuario.findById(re.usuario.id, function(err, usuario){
				if (!err && usuario){
					if(usuario.authenticate(passwordDetails.currentPasword)){
						if(passwordDetails.newPassword === passwordDetails.verifyPassword){
							usuario.password = passwordDetails.newPassword;
							usuario.save(function(err){
								if(err){
									return res.status(400).send({
										message: erroHandler.getErrormessage(err);
									}else {
										res.send({
											message: 'Se cambio correctamente su contraseña'
										});
									}


								});
							}
						});
					}else {
						rs.status(400).send({
							message: 'Los campos no coinciden'
						});
					}
				}else{
					res.status(400).send)({
						message: 'La contraseña es incorrecta'

					});
				}
			}else {
				res.status(400).send({
					message: 'No se encontro al usuario'
				});
				 }
			});
		}else {
			res.status(400).send({
				message: 'Porfavor teclea una contraseña nueva'
			});
		}
	}else {
		res.status(400).send({
			message: 'Necesitas iniciar sesion'
		});
	}
};

