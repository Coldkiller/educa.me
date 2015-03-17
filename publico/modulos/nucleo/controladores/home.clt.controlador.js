'use strict';

angular.module('nucleo').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		$scope.authentication = Authentication;
	}
]);