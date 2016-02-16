define(function(require, exports, module) {
	var Time = require('time');
	var Life = Time.extend(function() {
		this.sizeInfo;//[x,z,正反面1for正]

		this.effect = {}; // 物体属性，可定义其他物体的伤害值或其他影响

		this.constructor = function() {
			this.super();
		}

		this.destory = function() {
			this.die();
		}
	});

	module.exports = Life;
});