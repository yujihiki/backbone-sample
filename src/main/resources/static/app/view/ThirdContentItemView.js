define(
	['text!view/template/third-content-item-template.html', 'marionette'],
	function (html) {
		"use strict";
		var ThirdContentItemView = Marionette.ItemView.extend({
			events: {
				'dragstart': 'dragStart',
				'dragover': 'dragOver',
				'dragenter':'dragEnter',
				'dragleave':'dragLeave',
				'drop': 'dropped',
			},
			modelEvents: {
				'change': 'fieldsChanged'
			},
			tagName: 'div draggable=true',
			className: 'nx-top_news_fourth cmn-clearfix',
			template: _.template(html),
			// Functions
			fieldsChanged: function () {
				this.render();
			},
			dragStart: function (event, data, clone, element) {
				console.log("dragStart : ", this.model.attributes);
				event.originalEvent.dataTransfer.setData('Text', this.model.get("title"));
			},
			dragOver: function (event) {
				event.preventDefault();
				if(!this.$el.hasClass('drag-enter')) this.$el.addClass('drag-enter');
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
				this.trigger("third-item:dropContent", {index:this._index, title: title});
			},
		});
		return ThirdContentItemView;
	}
);