define(function(require, exports, module) {
	var Time = requie('time');
	var Life = Time.extend(function() {
		this.sizeInfo;//[x,z,正反面1for正]

		this.snakeEffect = {};

		this.destory = function() {
			this.die();
		}
	});
});