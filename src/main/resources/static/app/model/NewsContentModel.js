define(['backbone'], function () {
	'use strict';
	return Backbone.Model.extend({
		idAttribute: "contentId",
		urlRoot: '/BackboneSample',
		defaults: {
			contentId: 'N/A',
			title: 'N/A',
			overview: 'N/A',
			description: 'N/A'
		},
		validate: function (attrs) {
			var errors = {};
			var flg = false;
			if (flg === true) {
				return errors;
			}
		}
	});
});