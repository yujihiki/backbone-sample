define(
	['text!view/template/third-contents-template.html', 'view/ThirdContentItemView', 'marionette'],
	function (html, ThirdContentItemView) {
		"use strict";
		var ThirdContentsView = Marionette.CompositeView.extend({
			childView: ThirdContentItemView,
			childViewContainer: "#third-content-items",
			childEvents: {
				'third-item:dropContent': 'dropContentOnItems',
				'swap:Top':"dropFromTopItems",
				'swap:Second':'dropFromSecondItems',
				'swap:Third':'dropFromThirdItems'
			},
			template: _.template(html),
			dropContentOnItems: function(event, data) {
				this.trigger("third:dropContent", data);
			},
			dropFromTopItems:function(data){
				this.trigger("swap:Top",data)

			},
			dropFromSecondItems: function(event, data) {
				this.trigger("swap:Second", data);
			},
			dropFromThirdItems:function(event,data){
				this.trigger("swap:Third", data);
			}
		});
		return ThirdContentsView;
	}
);