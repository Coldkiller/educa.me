'use strict';

var getUniqueErrorMessage = function(err) {
	var output;
	try {
		var fieldName = err.err.substring(err.err.lastIndexOf('.$') + 2, err.err.lasIndexOf('_1'));
		output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + 'ya existe';
	} catch (ex) {
		output = 'Debe existir solo uno';
	}
	return output;
};

exports.getErrorMessage = function(err) {
	var message = '';
	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = getUniqueErrorMessage(err);
				break;
			default:
				message = 'Lo sentimos tanto';
		}
	} else {
		for (var errName in err.errores) {
			if (err.errores[errName].message) message = err.errores[errName].message;
		}
	}
	return message;
};