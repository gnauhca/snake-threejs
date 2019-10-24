/* 食物管理类 */

define(function(require, exports, module) {

var blockFactory = require('block-factory.js');

var BlockHandler = Class.extend(function() {
	var that = this;
	this.blockDatas;
	this.blocks = [];
	this.scene;

	this.constructor = function(scene) {
		this.scene = scene;
	}

	// 装载食物
	this.setUp = function(_blockDatas) {
		this.blockDatas = _blockDatas;
	}

	this.start = function() {
		this.createBlocks();
	}

	//游戏退出时候由game对象通知
	this.exit = function() {
		this.blocks.length = 0;
	}

	this.createBlocks = function() {
		this.blockDatas.forEach(function(blockData) {
			that.blocks.push(blockFactory.getBlock(that.scene, blockData.type, blockData, function(block) {
				that.handleBlockDestory(block);
			}));
		});
	}

	// 处理食物消失事件
	this.handleBlockDestory = function(block) {
		for (var i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i] === block) {
				this.blocks.splice(i, 1);
				break;
			}
		}
	}


});


module.exports = BlockHandler;

});