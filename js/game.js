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
	var TimeBody = require('time');
	var Scene = require('scene');
	var Snake = require('snake');

	var Game = TimeBody.extend(function(gameData) {
		var score;
		var gameData = extend(true, {
			speed: 800, //蛇的速度
			mapInfo: {},
			blocks: {},//障碍
			time: 120,//总时间限制
			score: 2000 //需要得几分过关
		}, gameData);

		this.timeThings = [];
		//this.gameUI;
		this.scene = new Scene(document.getElementById('renderDom'));

		this.init = function() {
			console.log('init');
			var snake = new Snake(this.scene, {
				speed: gameData.speed
			});
			snake._draw();
			TIME.start();
			this.start();

		}

		this.start = function() {
			this.timeThings.forEach(function(timeThing) {
				if (typeof timeThing.wake === 'function')
				timeThing.wake();
			});			
		}

		this.pause = function() {
			this.timeThings.forEach(function(timeThing) {
				if (typeof timeThing.sleep === 'function')
				timeThing.sleep();
			});
		}


	});

	module.exports = Game;
});





























