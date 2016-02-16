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

		this.init = function() {
			this.start();
		}

		this.start = function() {

			this.snake.setUp({speed: gameData.speed});
			this.snake.start();
			TIME.start();
		}

		this.pause = function() {
			TIME.stop();
		}


	});

	module.exports = Game;
});





























