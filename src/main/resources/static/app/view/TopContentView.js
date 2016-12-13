define(
	['text!view/template/top-content-template.html', 'marionette', 'modelbinder'],
	function (html) {
		"use strict";
		var TopContentView = Marionette.ItemView.extend({
			events: {
				'dragstart': 'dragStart',
				'dragover': 'dragOver',
				'dragenter': 'dragEnter',
				'dragleave': 'dragLeave',
				'drop': 'dropped',
			},
			modelEvents: {
				'change': 'fieldsChanged'
			},
			tagName: 'div draggable=true',
			className: 'nx-top_news_first cmn-clearfix',
			template: _.template(html),
			// Functions
			fieldsChanged: function () {
				this.render();
			},
			dragStart: function (event, data, clone, element) {
				console.log("dragStart : ", this.model.attributes);
				event.originalEvent.dataTransfer.setData('Text', this.model.get("title"));
				event.originalEvent.dataTransfer.setData('flag', new Boolean(true));
				event.originalEvent.dataTransfer.setData('Content', "Top");


			},
			dragOver: function (event) {
				event.preventDefault();
				if (!this.$el.hasClass('drag-enter')) this.$el.addClass('drag-enter');
			},
			dragEnter: function (event) {
				this.$el.addClass('drag-enter');
			},
			dragLeave: function (event) {
				this.$el.removeClass('drag-enter');
			},
			dropped: function (event, data, clone, element) {
				event.stopPropagation();
				this.$el.removeClass('drag-enter');
				var title = event.originalEvent.dataTransfer.getData('Text');
				console.log("dropped :" + title);

				var flag = event.originalEvent.dataTransfer.getData('flag');
				if (flag !== "true") {
					console.log("押し下げ")
					this.trigger("top:dropContent", { index: null, title: title });
				}
				else{
					this.trigger("swap:"+event.originalEvent.dataTransfer.getData('Content'), { index: null, title: title });
				}
			},
		});
		return TopContentView;
	}
);
