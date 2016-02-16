view = Class.extend(function() {
	var viewData = {};//不同view 传递过来的数据
	var viewWrap;

	this.constructor = function(viewWrap) {
		viewWrap = viewWrap;
		this.init();
	}

	this.init = function() {}

	this.active = function(viewData) {
		viewData = viewData;
		viewWrap.style.display = 'block';
	}

	this.gotoView = function(view, viewData) {
		viewWrap.style.display = 'none';
		view.active(viewData);
	}
});