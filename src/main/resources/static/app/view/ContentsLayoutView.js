define(['marionette'], function () {
	"use strict";
	var ContentsLayoutView = Marionette.LayoutView.extend({
		el: "#contents",
		regions: {
			topContent:'#top-content',
			secondContents:'#second-contents',
			thirdContents:'#third-contents',
			itemview: "#itemview"
		}
	});
	return ContentsLayoutView;
});