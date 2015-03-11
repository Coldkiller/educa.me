'use strict';

module.exports = function(webapp){
	var nucleo = require('../../webapp/controladores/nucleo.srv.controlador');
	webapp.route('/').get(nucleo.index);
};