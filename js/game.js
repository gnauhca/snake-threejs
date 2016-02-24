/* 负责给 scene snake 等对象提供构建数据， 控制，判断游戏逻辑，提供暂停，结束订阅*/

/**
 * 
 * init();
 * setUp();
 * pause();
 * start();
 * 
 * 
 * 
 */

//测试数据
// 蛇
var snakeData = {speed: 300}

//food
var foodDatas = [

{
	size: [0,-5],
	type: 'normal',
	color: 0xff0000,
	order: 0,
	orderRequired: true
},

{
	size: [10,5],
	type: 'normal',
	color: 0x00ff00,
	order: 1,
	orderRequired: true
},

{
	size: [-3,10],
	type: 'normal',
	color: 0xabcdef,
	order: 1,
	orderRequired: true
},

{
	size: [-10,-10],
	type: 'normal',
	color: 0x785bed,
	order: 2,
	orderRequired: true
},


];






define(function(require, exports, module) {
	var Time = require('time');
	var Scene = require('scene');
	var Snake = require('snake');
	var Foodhandler = require('foodhandler');

	var Game = Time.extend(function(gameData) {
		var score;
		var gameData = extend(true, {
			speed: 500, //蛇的速度
			mapInfo: {},
			blocks: {},//障碍
			time: 120,//总时间限制
			score: 2000 //需要得几分过关
		}, gameData);

		//this.gameUI;
		this.scene = new Scene(document.getElementById('renderDom'));
		this.snake = new Snake(this.scene);
		this.foodhandler = new Foodhandler(this.scene);

		this.init = function() {
			this.start();
		}

		this.start = function() {

			this.snake.setUp(snakeData);
			this.snake.start();

			this.foodhandler.setUp(foodDatas);
			this.foodhandler.start();

			TIME.start();
		}

		this.pause = function() {
			TIME.stop();
		}


	});

	module.exports = Game;
});





























