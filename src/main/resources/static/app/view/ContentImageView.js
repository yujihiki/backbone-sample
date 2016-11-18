define(
	['text!view/template/content-image-template.html', 'marionette'],
	function (html) {
		"use strict";
		var ContentImageView = Marionette.ItemView.extend({
			events: {},
			tagName: 'div',
			className: 'card',
			template: _.template(html),
		});
		return ContentImageView;
	}
);