define(
	['text!view/template/second-content-item-template.html', 'marionette'],
	function (html) {
		"use strict";
		var SecondContentItemView = Marionette.ItemView.extend({
			events: {
				'dragstart': 'dragStart',
				'dragover': 'dragOver',
				'drop': 'dropped',
			},
			modelEvents: {
				'change': 'fieldsChanged'
			},
			tagName: 'div draggable=true',
			className: 'row',
			template: _.template(html),
			// Functions
			fieldsChanged: function () {
				this.render();
			},
			dragStart: function (event, data, clone, element) {
				console.log("dragStart : " + this.model.get("title"));
				event.originalEvent.dataTransfer.setData('Text', this.model.get("title"));
			},
			dragOver: function (event) {
				event.preventDefault();
			},
			dropped: function (event, data, clone, element) {
				event.stopPropagation();
				var title = event.originalEvent.dataTransfer.getData('Text');
				console.log("dropped :" + title);
				this.trigger("second-item:dropContent", {index:this._index, title: title});
			},
		});
		return SecondContentItemView;
	}
);