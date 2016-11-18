(function () {
	'use strict';
	require.config({
		paths: {
			'marionette': '../lib/backbone.marionette/backbone.marionette',
			'backbone': '../lib/backbone/backbone',
			'underscore': '../lib/underscore/underscore',
			'jquery': '../lib/jquery/jquery',
			'modelbinder': '../lib/backbone.modelbinder/Backbone.ModelBinder',
			'text': '../lib/requirejs-text/text',
			// Model
			'NewsContentModel': 'model/NewsContentModel',
			'NewsContentCollection': 'model/NewsContentCollection',
			// View
			'ContentsLayoutView': 'view/ContentsLayoutView',
			'ContentPreviewView': 'view/ContentPreviewView',
			'ContentImageView': 'view/ContentImageView',
			'GridView': 'view/GridView',
			'GridRowView': 'view/GridRowView',
			// Controller
			'MainController': 'controller/MainController',
			'MainRouter': 'controller/MainRouter',
		}
	});

	require(
		['MainRouter', 'MainController', 'marionette'],
		function (MainRouter, MainController) {
			var App = Marionette.Application.extend({
				initialize: function (options) {
					var mainController = new MainController();
					new MainRouter({
						controller: mainController
					});
				}
			});
			var app = new App();
			app.on('start', function () {
				Backbone.history.start();
			});
			app.start();
		}
	);

}).call(this);
