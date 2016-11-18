define(
	['text!view/template/content-prev-template.html', 'ContentImageView', 'marionette', 'modelbinder'],
	function (html, ContentImageView) {
		"use strict";
		var ContentPreviewView = Marionette.CompositeView.extend({
			childView: ContentImageView,
			childViewContainer: ".images",
			template: _.template(html)
		});
		return ContentPreviewView;
	}
);