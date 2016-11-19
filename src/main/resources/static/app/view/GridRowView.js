define(
	['text!view/template/content-row-template.html', 'marionette'],
	function (html) {
		"use strict";
		var GridRowView = Marionette.ItemView.extend({
			events: {
				'dragstart': 'dragStart',
				'dragover': 'dragOver',
				'drop': 'dropped',
			},
			tagName: 'tr draggable=true',
			template: _.template(html),
			dragStart: function(event, data, clone, element) {
				console.log("dragStart : " + this.model.get("title"));
				event.originalEvent.dataTransfer.setData('Text', this.model.get("title"));
			},
			dragOver: function(event) {
				event.preventDefault();
			},
			dropped: function (event, data, clone, element) {
				event.stopPropagation();
				console.log("dropped :" + event.originalEvent.dataTransfer.getData('Text'));
			},
		});
		return GridRowView;
	}
);