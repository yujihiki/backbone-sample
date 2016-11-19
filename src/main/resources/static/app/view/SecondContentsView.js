define(
	['text!view/template/second-contents-template.html', 'view/SecondContentItemView', 'marionette'],
	function (html, SecondContentItemView) {
		"use strict";
		var SecondContentsView = Marionette.CompositeView.extend({
			childView: SecondContentItemView,
			childViewContainer: "#second-content-items",
			childEvents: {
				'second-item:dropContent': 'dropContentOnItems'
			},
			template: _.template(html),
			dropContentOnItems: function(event, data) {
				this.trigger("second:dropContent", data);
			}
		});
		return SecondContentsView;
	}
);