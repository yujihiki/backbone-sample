define(['marionette'], function () {
	"use strict";
	var ContentsLayoutView = Marionette.LayoutView.extend({
		el: "#contents",
		regions: {
			preview: "#preview",
			itemview: "#itemview"
		}
	});
	return ContentsLayoutView;
});