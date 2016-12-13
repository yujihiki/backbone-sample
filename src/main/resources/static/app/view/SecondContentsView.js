define(
	['text!view/template/second-contents-template.html', 'view/SecondContentItemView', 'marionette'],
	function (html, SecondContentItemView) {
		"use strict";
		var SecondContentsView = Marionette.CompositeView.extend({
			childView: SecondContentItemView,
			childViewContainer: "#second-content-items",
			childEvents: {
				'second-item:dropContent': 'dropContentOnItems',
				'swap:Top':"dropFromTopItems",
				'swap:Second':'dropFromSecondItems',
				'swap:Third':'dropFromThirdItems'
			},
			template: _.template(html),
			dropContentOnItems: function(event, data) {
				this.trigger("second:dropContent", data);
			},
			dropFromTopItems:function(event,data){
				this.trigger("swap:Top",data)

			},
			dropFromSecondItems: function(event, data) {
				this.trigger("swap:Second", data);
			},
			dropFromThirdItems:function(event,data){
				this.trigger("swap:Third", data);
			}
		});
		return SecondContentsView;
	}
);