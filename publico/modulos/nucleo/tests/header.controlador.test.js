'use strict';
(function() {
		describe('HeaderController', function({
				var scope;
				var HeaderController;
				beforeEach(module(ConfigApp.NombreModuloApp));
				beforeEach(inject(function($controller, $rootScope) {
					scope = $rootScope.$new();
					HeaderController = $controller('HeaderController', {
						$scope: scope
					});
				}));
				it('La operacion solicita autenticarse', function() {
					expect(scope.authentication).toBeTruthy();
				});
			});

		})();