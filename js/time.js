/* 时间 */
var TIME = {

	// 所有时间body对象
	bodys : []
}

;(function() {

stop = false;
TIME.addBody = function(timeBody) {
	this.bodys.push(timeBody);
}

TIME.removeBody = function(timeBody) {
	var index = this.bodys.indexOf(timeBody);

	if (index !== -1) {
		this.bodys.splice(index, 1);
	}
}

TIME.tick = function() {
	TIME.handleFrame();

	if (!stop) {
		//requestAnimationFrame(TIME.tick);
		setTimeout(TIME.tick, 20);
	}
}

TIME.start = function() {
	stop = false;
	this.tick();
}

TIME.stop = function() {
	stop = true;
}

TIME.handleFrame = function() {
	this.bodys.forEach(function(body) {
		body.frameTasks.forEach(function(frameTask) {
			frameTask.fn && frameTask.fn();
		});
	});
	TWEEN.update();
}	

})();




/* 时间物体类，提供两个时机，帧更新，固定间隔更新，每一个有时间概念的物体，就继承 */
var TimeBody = Class.extend(function TimeBody() {
	var that = this;

	this.frameTasks = [];
	this.tweens = [];
	this.stop = true;

	this.constructor = function() {
		TIME.addBody(this);
	}

	/**
	 * 该物体灭亡
	 */
	this.die = function() {
		TIME.removeBody(this);
	}

	/** 
	 * 帧更新
	 * @param timegap 与上一帧的时间间隔
	 */
	this.addFrameTask = function(fn) {
		var frameTask = {'fn': fn};

		this.frameTasks.push(frameTask);
		return frameTask;
	}

	this.removeFrameTask = function(frameTask) {
		var index = this.bodys.indexOf(frameTasks);

		if (index !== -1) {
			this.frameTasks.splice(index, 1);
		}		
	}

	/** 
	 * 包装tween
	 * @param timegap 与上一帧的时间间隔
	 */
	this.addTween = function(A, B, time, updateFn, endFn) {
		var tween = new TWEEN.Tween(A).to(B, time).onUpdate(function() {
			updateFn(this);
		}).onComplete(function() {
			that.removeTween(tween);
			endFn();
		});

		this.tweens.push(tween);
	}

	this.removeTween = function(tween) {
		var index = this.tweens.indexOf(tween);

		if (index !== -1) {
			this.tweens.splice(index, 1);
		}
	}

	// sleep 暂停时间
	this.sleep = function() {
		this.stop = true;
		this.tweens.forEach(function(tween) {
			tween.stop();
		});
	}

	this.wake = function() {
		this.stop = false;
		this.tweens.forEach(function(tween) {
			tween.start();
		});
	}
});

define(function(require, exports, module) {
	module.exports = TimeBody;
});








