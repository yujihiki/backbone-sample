define([
	'ContentsLayoutView', 'GridView', 'TopContentView', 'SecondContentsView', 'ThirdContentsView',
	'NewsContentCollection', 'NewsContentModel', 'marionette'],
	function (
		ContentsLayoutView, GridView, TopContentView, SecondContentsView, ThirdContentsView,
		NewsContentCollection, NewsContentModel
	) {
		"use strict";
		return Marionette.Object.extend({
			// Model
			contentCollection: null,
			topContentModel: null,
			secondContentCollection: null,
			thirdConentCollection: null,
			// View
			contentsLayoutView: null,
			gridView: null,
			topContentView: null,
			secondContentsView: null,
			thirdContentsView: null,
			initialize: function (options) {
				// Initialize Model
				this.topContentModel = new NewsContentModel();
				this.contentCollection = new NewsContentCollection();
				this.secondContentCollection = new NewsContentCollection(),
				this.thirdContentCollection = new NewsContentCollection(),
				// Fetch Collection
				//this.contentCollection.fetch({
				//	contentType: 'application/json; charset=UTF-8',
				//	dataType: 'json',
				//	async: false
				//});
				// Initialize LayoutView
				this.contentsLayoutView = new ContentsLayoutView();
				// Initialize View
				this.topContentView = new TopContentView({
					model: this.topContentModel
				});
				this.secondContentsView = new SecondContentsView({
					collection: this.secondContentCollection
				});
				this.thirdContentsView = new ThirdContentsView({
					collection: this.thirdContentCollection
				});
				this.gridView = new GridView({
					collection: this.contentCollection
				});
				// Setting events
				this.listenTo(this.topContentView, "top:dropContent", function (data) {
					console.log("top:dropContent :" + JSON.stringify(data));
					this.topContentModel.set(this.contentCollection.where({'title': data.title})[0].toJSON());
				});
				this.listenTo(this.secondContentsView, "second:dropContent", function (data) {
					console.log("second:dropContent :" + JSON.stringify(data));
					this.secondContentCollection.at(data.index).set(this.contentCollection.where({'title': data.title})[0].toJSON());
				});
				this.listenTo(this.thirdContentsView, "third:dropContent", function (data) {
					console.log("third:dropContent :" + JSON.stringify(data));
					this.thirdContentCollection.at(data.index).set(this.contentCollection.where({'title': data.title})[0].toJSON());
				});
			},
			home: function (param) {
				for(var idx = 0;idx < 10;idx++) {
					this.contentCollection.add({
						'contentId': idx,
						'title': '記事タイトル９９９９９９-' + idx,
						'overview': '記事概要９９９９９９９９９９９９９９９９９９９９９９９９９９９９９９-' + idx,
						'description': '記事詳細９９９９９９９９９９９９９９９９９９９９９９９９９９９９９９-' + idx,
						'contentsDate': idx + ":00",
						'contentsImage': './app/image/contents-' + idx + '.png',
						'children': [
							{
								'title': '関連記事タイトル-' + idx + '-0',
							},
							{
								'title': '関連記事タイトル-' + idx + '-1',
							},
							{
								'title': '関連記事タイトル-' + idx + '-2',
							},
							{
								'title': '関連記事タイトル-' + idx + '-3',
							},
						]
					});
				}
				// 先頭のコンテンツをTopContentViewに表示
				this.topContentModel.set(this.contentCollection.at(0).toJSON());
				// 2～4番目をSecondContentsViewに表示
				for(var idx = 1;idx < 4;idx++) {
					this.secondContentCollection.add(this.contentCollection.at(idx).toJSON());
				}
				// 残りをThirdContentsViewに表示
				for(var idx = 4;idx < 10;idx++) {
					this.thirdContentCollection.add(this.contentCollection.at(idx).toJSON());
				}
				$("#nav_home").attr("class", "active");
				$("#nav_summary").attr("class", "");
				this.contentsLayoutView.getRegion('topContent').show(this.topContentView);
				this.contentsLayoutView.getRegion('secondContents').show(this.secondContentsView);
				this.contentsLayoutView.getRegion('thirdContents').show(this.thirdContentsView);
				this.contentsLayoutView.getRegion('itemview').show(this.gridView);
			},
		});
	}
);