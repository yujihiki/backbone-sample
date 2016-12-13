define(
	['text!view/template/second-content-item-template.html', 'marionette'],
	function (html) {
		"use strict";
		var SecondContentItemView = Marionette.ItemView.extend({
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
			className: 'nxc-topics cmn-clearfix',
			template: _.template(html),
			// Functions
			fieldsChanged: function () {
				this.render();
			},
			dragStart: function (event, data, clone, element) {
				console.log("dragStart : ", this.model.attributes);
				event.originalEvent.dataTransfer.setData('Text', this.model.get("title"));
				event.originalEvent.dataTransfer.setData('flag', new Boolean(true));
				event.originalEvent.dataTransfer.setData('Content', "Second");
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
				
				var flag = event.originalEvent.dataTransfer.getData('flag');
				if(flag !== "true"){
					console.log("押し下げ")
					this.trigger("second-item:dropContent", {index:this._index, title: title});
				}
				else{	
					this.trigger("swap:"+event.originalEvent.dataTransfer.getData('Content'), {index:this._index, title: title});
				}
			},
		});
		return SecondContentItemView;
	}
);