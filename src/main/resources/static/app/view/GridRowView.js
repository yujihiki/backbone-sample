define(
	['text!view/template/content-row-template.html', 'marionette'],
	function (html) {
		"use strict";
		var GridRowView = Marionette.ItemView.extend({
			events: {},
			tagName: 'tr',
			template: _.template(html),
		});
		return GridRowView;
	}
);