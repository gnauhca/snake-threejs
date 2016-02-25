define(function(require, exports, module) {
	var Life = require('life.js');
	var Food = Life.extend(function() {
		this.destoryCallback;
		this.mesh;

		this.constructor = function(scene, foodData, _destoryCallback) {
			// 创建
			this.super();
			this.scene = scene;
			this.destoryCallback = _destoryCallback;
			this.init(foodData);
		}

		this.init = function(foodData) {

		}

		this.destory = function() {
			this.super.destory();
			this.destoryCallback && this.destoryCallback(this);
		}
	});
	module.exports = Food;
});