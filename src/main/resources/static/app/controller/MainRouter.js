define(['marionette'], function () {
	"use strict";
	return Marionette.AppRouter.extend({
		appRoutes: {
			'': 'home',
			'home': 'home'
		}
	});
});