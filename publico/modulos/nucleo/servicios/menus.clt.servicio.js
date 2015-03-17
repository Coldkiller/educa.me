'use strict';
angular.module('nucleo').service('Menus', [ 

function() {
	this.defaultRoles = ['*'];
	this.menus = {};
	var shouldRendr = function(usuario) {
		if (usuario) {
			if (!!~this.roles.indexOf('*')) {
				return true;
			} else {
				for (var usuarioRoleIndex in usuario.roles) {
					for (var roleindex in this.roles) {
						if (this.roles[roleIndex] === usuario.roles[usuarioRoleIndex]) {
							return true;
						}
					}
				}
			}
		} else {
			return this.isPublic;
		}
	}
	return false;
};

//validamos neustro menus existentes
this.validateMenuExistence = function(menuId) {
	if (menuId && menuId.length) {
		if (this.menus[menuId]) {
			return true;
		} else {
			throw new Error('Este menu no existe');
		}
	} else {
		throw new Error('No entrego provedor de id para el menu');
	}
	return false;
};

//usar un menu por su id
this.getMenu = function(menuId){
	this.validateMenuExistence(menuId);
	return this.menus[menuId];
};

// agregar un meu por su id
this.addMenu = function(menuId, isPublic, roles){
	this.menus[menuId] = {
		isPublic: isPublic || false,
		roles: roles || this.defaultRoles,
		items: [],
		shouldRendr: shouldRendr
	};

//entregame un menu
return this.menus[menuId];
};

//eliminar menus existentes
this.removeMenu = function(menuId){
	//verificamos que el menu existe
	this.validateMenuExistence(menuId);
	delete this.menus[menuId];
};

//agrega un item de menu
this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position){
	this.validateMenuExistence(menuId);
	this.menus[menuId].items.push({
		title: menuItemTitle,
		link: menuItemURL,
		menuItemType: menuItemType || 'item',
		menuItemClass: menuItemType,
		uiRoute: menuItemUIRoute || ('/' + menuItemURL),
		isPublic: ((isPublic  === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublico),
		position: position || 0,
		items: [],
		shouldRendr: shouldRendr
});
	//obtenemos un objeto menu
	return this.menus[menuId];
};
//agragar objeto de submenu
this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position){
	this.validateMenuExistence(menuId);
	//buscar un item de menu
	for(var itemIndex in this.menus[menuId].items){
		if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL){
			this.menus[menuId].items[itemIndex].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].ispublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
				position: position || 0,
				shouldREndr: shouldRendr
			});
		}
	}
}//obtenemos nuestro objeto menu
return this.menus[menuId];
};
this.addMenu('topbar');
}
]);





