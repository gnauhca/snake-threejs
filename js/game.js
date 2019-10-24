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




define(function(require, exports, module) {
	var Time = require('time');
	var Scene = require('scene');
	var Snake = require('snake');
	var Foodhandler = require('food/food-handler');
	var Blockhandler = require('block/block-handler');

	var Game = Time.extend(function() {
		var score;

		//this.gameUI;
		this.scene = new Scene(document.getElementById('renderDom'));
		this.snake = new Snake(this.scene);
		this.foodhandler = new Foodhandler(this.scene);
		this.blockhandler = new Blockhandler(this.scene);

		this.init = function() {
			this.start();
		}

		this.start = function() {

			this.snake.setUp(gameData.snake);
			this.snake.start();

			this.foodhandler.setUp(gameData.food);
			this.foodhandler.start();

			this.blockhandler.setUp(gameData.block);
			this.blockhandler.start();

			TIME.start();
		}

		this.pause = function() {
			TIME.stop();
		}


	});

	module.exports = Game;
});



// test data
gameData = {
	"snake": {speed: 300},
	"block": [
		{
			"size": [
				20,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				20,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				19,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				19,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				19,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				19,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				18,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				18,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				18,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				18,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				17,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				17,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				17,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				16,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				16,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				16,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				16,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				15,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				14,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				14,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				12,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				11,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				11,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				11,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				11,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				10,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				10,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				9,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				9,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				8,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				8,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				7,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				7,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				7,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				7,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				6,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				3,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				2,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				2,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				2,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				2,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				2,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				1,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				1,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				1,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				1,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				0,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				0,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				0,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-1,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-1,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-1,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-1,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-1,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-2,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				-6,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				-7,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-7,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				-7,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				-7,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-8,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-8,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-8,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-8,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-9,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-9,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-10,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-10,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-10,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-11,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-11,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-11,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				-12,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-1
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-2
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-3
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-4
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-5
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-6
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-7
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-8
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-9
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-10
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-11
			],
			"type": "normal"
		},
		{
			"size": [
				-16,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-17,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-17,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-17,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-18,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-18,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-19,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-19,
				-12
			],
			"type": "normal"
		},
		{
			"size": [
				-20,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-21,
				2
			],
			"type": "normal"
		},
		{
			"size": [
				-21,
				1
			],
			"type": "normal"
		},
		{
			"size": [
				-21,
				0
			],
			"type": "normal"
		},
		{
			"size": [
				-21,
				-1
			],
			"type": "normal"
		}
	],
	"food": [
		{
			"size": [
				23,
				-6
			],
			"type": "double",
			"order": "3",
			"orderRequired": true
		},
		{
			"size": [
				17,
				6
			],
			"type": "double",
			"order": "3",
			"orderRequired": true
		},
		{
			"size": [
				6,
				-17
			],
			"type": "double",
			"order": "1",
			"orderRequired": true
		},
		{
			"size": [
				4,
				9
			],
			"type": "accelerator",
			"order": "1",
			"orderRequired": true
		},
		{
			"size": [
				4,
				-6
			],
			"type": "normal",
			"order": "2",
			"orderRequired": true
		},
		{
			"size": [
				2,
				-24
			],
			"type": "double",
			"order": "3",
			"orderRequired": true
		},
		{
			"size": [
				-4,
				-6
			],
			"type": "life",
			"order": "2",
			"orderRequired": true
		},
		{
			"size": [
				-7,
				7
			],
			"type": "accelerator",
			"order": "2",
			"orderRequired": true
		},
		{
			"size": [
				-8,
				-17
			],
			"type": "normal",
			"order": "1",
			"orderRequired": true
		},
		{
			"size": [
				-14,
				-5
			],
			"type": "double",
			"order": "2",
			"orderRequired": true
		},
		{
			"size": [
				-23,
				-6
			],
			"type": "normal",
			"order": "3",
			"orderRequired": true
		}
	]
}

























