define(function(require, exports, module) {
	var Time = require('time');
	var Life = Time.extend(function() {
		this.sizeInfo;//[x,z,正反面1for正]

		this.snakeEffect = {};

		this.constructor = function() {
			this.super();
		}

		this.destory = function() {
			this.die();
		}
	});

	module.exports = Life;
});