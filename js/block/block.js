define(function(require, exports, module) {
	var Life = require('life.js');
	var Block = Life.extend(function() {
		this.destoryCallback;
		this.mesh;

		this.constructor = function(scene, blockData, _destoryCallback) {
			// 创建
			this.super();
			this.scene = scene;
			this.destoryCallback = _destoryCallback;
			this.init(blockData);
		}

		this.init = function(blockData) {

		}

		this.destory = function() {
			this.super.destory();
			this.destoryCallback && this.destoryCallback(this);
		}
	});
	module.exports = Block;
});


