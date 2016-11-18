(function () {
	'use strict';
	require.config({
		paths: {
			'marionette': './lib/backbone.marionette/backbone.marionette',
			'backbone': './lib/backbone/backbone',
			'underscore': './lib/underscore/underscore',
			'jquery': './lib/jquery/jquery',
			'modelbinder': './lib/backbone.modelbinder/Backbone.ModelBinder',
			'text': './lib/requirejs-text/text',
		}
	});

	define(
		['marionette'],
		function () {
			var SampleApp = new Marionette.Application();
			SampleApp.addRegions({
				mainRegion : '#contents'
			});
			SampleApp.onStart = function(){console.log("start.");};
			SampleApp.start();
		}
	);

}).call(this);
