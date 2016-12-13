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

					if (this.topContentModel.get("title") === data.title ||
						this.secondContentCollection.where({ 'title': data.title }).length > 0 ||
						this.thirdContentCollection.where({ 'title': data.title }).length > 0)
						return;

					for (var idx = 5; idx > 0; idx--) {
						this.thirdContentCollection.at(idx).set(this.thirdContentCollection.at(idx - 1).toJSON());
					}
					this.thirdContentCollection.at(0).set(this.secondContentCollection.at(2).toJSON());
					for (var idx = 2; idx > 0; idx--) {
						this.secondContentCollection.at(idx).set(this.secondContentCollection.at(idx - 1).toJSON());
					}
					this.secondContentCollection.at(0).set(this.topContentModel.toJSON());


					this.topContentModel.set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});
				this.listenTo(this.secondContentsView, "second:dropContent", function (data) {
					console.log("second:dropContent :" + JSON.stringify(data));

					if (this.topContentModel.get("title") === data.title ||
						this.secondContentCollection.where({ 'title': data.title }).length > 0 ||
						this.thirdContentCollection.where({ 'title': data.title }).length > 0)
						return;

					for (var idx = 5; idx > 0; idx--) {
						this.thirdContentCollection.at(idx).set(this.thirdContentCollection.at(idx - 1).toJSON());
					}
					this.thirdContentCollection.at(0).set(this.secondContentCollection.at(2).toJSON());
					for (var idx = 2; idx > data.index; idx--) {
						this.secondContentCollection.at(idx).set(this.secondContentCollection.at(idx - 1).toJSON());
					}
					this.secondContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});
				this.listenTo(this.thirdContentsView, "third:dropContent", function (data) {
					console.log("third:dropContent :" + JSON.stringify(data));

					if (this.topContentModel.get("title") === data.title ||
						this.secondContentCollection.where({ 'title': data.title }).length > 0 ||
						this.thirdContentCollection.where({ 'title': data.title }).length > 0)
						return;

					for (var idx = 5; idx > data.index; idx--) {
						this.thirdContentCollection.at(idx).set(this.thirdContentCollection.at(idx - 1).toJSON());
					}
					this.thirdContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});

				this.listenTo(this.topContentView, "swap:Second", function (data) {
					console.log("swap from Second to Top");
					this.secondContentCollection.where({ 'title': data.title })[0].set(this.topContentModel.toJSON());
					this.topContentModel.set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});
				this.listenTo(this.topContentView, "swap:Third", function (data) {
					console.log("swap from Third to Top");
					this.thirdContentCollection.where({ 'title': data.title })[0].set(this.topContentModel.toJSON());
					this.topContentModel.set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});

				this.listenTo(this.secondContentsView, "swap:Top", function (data) {
					console.log("swap from Top to Second");
					this.topContentModel.set(this.secondContentCollection.at(data.index).toJSON());
					this.secondContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());
				});
				this.listenTo(this.secondContentsView, "swap:Second", function (data) {
					console.log("swap from Second to Second");
					this.secondContentCollection.where({ 'title': data.title })[0].set(this.secondContentCollection.at(data.index).toJSON());
					this.secondContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());

				});
				this.listenTo(this.secondContentsView, "swap:Third", function (data) {
					console.log("swap from Third to Second");
					this.thirdContentCollection.where({ 'title': data.title })[0].set(this.secondContentCollection.at(data.index).toJSON());
					this.secondContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());

				});

				this.listenTo(this.thirdContentsView, "swap:Top", function (data) {
					console.log("swap from Top to Third");
					this.topContentModel.set(this.thirdContentCollection.at(data.index).toJSON());
					this.thirdContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());

				});
				this.listenTo(this.thirdContentsView, "swap:Second", function (data) {
					console.log("swap from Second to Third");
					this.secondContentCollection.where({ 'title': data.title })[0].set(this.thirdContentCollection.at(data.index).toJSON());
					this.thirdContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());

				});
				this.listenTo(this.thirdContentsView, "swap:Third", function (data) {
					console.log("swap from Third to Third");
					this.thirdContentCollection.where({ 'title': data.title })[0].set(this.thirdContentCollection.at(data.index).toJSON());
					this.thirdContentCollection.at(data.index).set(this.contentCollection.where({ 'title': data.title })[0].toJSON());

				});

			},
			home: function (param) {
				// ダミーモデル生成
				for (var idx = 0; idx < 30; idx++) {
					this.contentCollection.add({
						'contentId': idx,
						'title': '記事タイトル９９９９９９-' + idx,
						'overview': '記事概要９９９９９９９９９９９９９９９９９９９９９９９９９９９９９９-' + idx,
						'description': '記事詳細９９９９９９９９９９９９９９９９９９９９９９９９９９９９９９-' + idx,
						'contentsDate': idx + ":00",
						'contents': [
													{
													'image':'./app/image/contents-' + idx + '.png',
												  },
													{
													'image':'./app/image/contents-' + (idx+1) + '.png',
												  },
													{
													'image':'./app/image/contents-' + (idx+2) + '.png',
												  }
						],
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
				for (var idx = 1; idx < 4; idx++) {
					this.secondContentCollection.add(this.contentCollection.at(idx).toJSON());
				}
				// 残りをThirdContentsViewに表示
				for (var idx = 4; idx < 10; idx++) {
					this.thirdContentCollection.add(this.contentCollection.at(idx).toJSON());
				}
				// タブアクティブ化と画面表示
				$("#nav_home").attr("class", "active");
				$("#nav_summary").attr("class", "");
				this.contentsLayoutView.getRegion('topContent').show(this.topContentView);
				this.contentsLayoutView.getRegion('secondContents').show(this.secondContentsView);
				this.contentsLayoutView.getRegion('thirdContents').show(this.thirdContentsView);
				this.contentsLayoutView.getRegion('itemview').show(this.gridView);
				var swiper = new Swiper('.swiper-container', {
					nextButton: '.swiper-button-next',
					prevButton: '.swiper-button-prev',
					pagination: '.swiper-pagination',
					//paginationType: 'fraction',
				  paginationClickable: true
				});

			},
		});
	}
);
