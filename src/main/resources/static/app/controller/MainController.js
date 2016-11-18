define([
	'ContentsLayoutView', 'GridView', 'ContentPreviewView',
	'NewsContentCollection', 'NewsContentModel', 'marionette'],
	function (
		ContentsLayoutView, GridView, ContentPreviewView,
		NewsContentCollection, NewsContentModel
	) {
		"use strict";
		return Marionette.Object.extend({
			// Model
			contentCollection: null,
			contentModel: null,
			// View
			contentsLayoutView: null,
			gridView: null,
			contentPreviewView: null,
			initialize: function (options) {
				// Initialize Model
				this.contentCollection = new NewsContentCollection();
				this.contentModel = new NewsContentModel();
				// Fetch Collection
				//this.contentCollection.fetch({
				//	contentType: 'application/json; charset=UTF-8',
				//	dataType: 'json',
				//	async: false
				//});
				// Initialize LayoutView
				this.contentsLayoutView = new ContentsLayoutView();
				// Initialize View
				this.contentPreviewView = new ContentPreviewView({
					collection: this.contentCollection
				});
				this.gridView = new GridView({
					collection: this.contentCollection
				});
				// Setting events
				this.listenTo(this.contentPreviewView, "title:click", function (data) {
					console.log(data);
				});
			},
			home: function (param) {
				console.log("home....");
				$("#nav_home").attr("class", "active");
				$("#nav_summary").attr("class", "");
				this.contentsLayoutView.getRegion('preview').show(this.contentPreviewView);
				this.contentsLayoutView.getRegion('itemview').show(this.gridView);
				for(var num = 0;num < 10;num++) {
					this.contentCollection.add({
						'contentId': num,
						'title': 'Content-' + num,
						'overview': 'Overview-' + num,
						'description': 'Description-' + num,
					});
				}
			},
		});
	}
);