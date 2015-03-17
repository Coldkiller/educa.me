'use strict';

angular.module('nucleo').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider.state('home', {url: '/', templateURL: 'modulos/nucleo/vistas/home.clt.vista.html'});
	} 
	]);