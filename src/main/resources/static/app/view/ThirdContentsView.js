define(
	['text!view/template/third-contents-template.html', 'view/ThirdContentItemView', 'marionette'],
	function (html, ThirdContentItemView) {
		"use strict";
		var ThirdContentsView = Marionette.CompositeView.extend({
			childView: ThirdContentItemView,
			childViewContainer: "#third-content-items",
			childEvents: {
				'third-item:dropContent': 'dropContentOnItems'
			},
			template: _.template(html),
			dropContentOnItems: function(event, data) {
				this.trigger("third:dropContent", data);
			}
		});
		return ThirdContentsView;
	}
);