'use strict';
(function(){
	describe('HomeController', function(){
		var scope,
		HomeController;
		beforeEach(module(ConfigApp.NombreModuloApp));
		beforeEach(inject(function($controller, $rootscope){
			scope = $rooscope.$new();
			HomeController = $controller('HomeController',{
				$scope: scope
			});
		}));
		it('muestrame el servicio de autenticacion', function(){
			expect(scope.authentication).toBeTruthy();
		});
	});
})();