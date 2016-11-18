define(['backbone', 'NewsContentModel'], function (Backbone, NewsContentModel) {
	'use strict';
	return Backbone.Collection.extend({
		model: NewsContentModel,
		url: '/BackboneSample'
	});
});