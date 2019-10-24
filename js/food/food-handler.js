/* 食物管理类 */

define(function(require, exports, module) {

var foodFactory = require('./food-factory.js');

var FoodHandler = Class.extend(function() {
	var that = this;
	this.foodDatas;
	this.orderFoods = []; // 影响食物出现次序的食物 既orderRequired为true的
	this.xorderFoods; // 对食物出现次序没有影响的页面
	this.currentOrder = 1; //当前是第几批次的食物
	this.scene;

	this.constructor = function(scene) {
		this.scene = scene;
	}

	// 装载食物
	this.setUp = function(_foodDatas) {
		this.foodDatas = _foodDatas;
	}

	this.start = function() {
		this.createFoods();
	}

	//游戏退出时候由game对象通知
	this.exit = function() {
		this.xorderFoods.length = 0;
		this.orderFoods.length = 0;
	}

	this.createFoods = function() {
		if (this.foodDatas.length === 0) {
			return;//食物出完了
		}

		var foodData,
			food;
		for (var i = this.foodDatas.length - 1; i >= 0; i--) {
			foodData = this.foodDatas[i];
			
			//console.log(foodData)
			if (parseInt(foodData.order) === this.currentOrder) {
				food = foodFactory.getFood(this.scene, foodData.type, foodData, function(_food) {that.handleFoodDestory(_food)});
				if (foodData.orderRequired) {
					this.orderFoods.push(food);
				} else {
					this.xorderFoods.push(food);
				}
				this.foodDatas.splice(i, 1);
			}
		};
		if (this.orderFoods.length === 0) {
			this.currentOrder++
			this.createFoods();
		}
	}

	// 处理食物消失事件
	this.handleFoodDestory = function(food) {
		for (var i = 0; i < this.orderFoods.length; i++) {
			if (this.orderFoods[i] === food) {
				this.orderFoods.splice(i, 1);
				break;
			}
		}

		if (this.orderFoods.length === 0) {
			// 从新从foodDatas中拿 下一个次序出现的食物
			
			this.currentOrder++;
			this.createFoods();
		}
	}


});


module.exports = FoodHandler;

});