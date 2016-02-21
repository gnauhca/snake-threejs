var hitCalculator = (function() {
	function hitCalculator() {
		this.lifes = [];
	}


	hitCalculator.prototype.addLife = function(life) {


		this.lifes.push(life);
		return life;
	}

	hitCalculator.prototype.removeLife = function(life) {
		if (!life) {
			// remove all
			this.lifes.length = 0;
			return;
		}

		var index = this.lifes.indexOf(life);

		if (index !== -1) {
			this.lifes.splice(index, 1);
		}
	}

	hitCalculator.prototype.calculate = function() {
		var that = this;
		var lifes = this.lifes;

		// 循环判断物体之间是否位置有重叠
		for (var i = 0,j=0,isHit; i < this.lifes.length; i++) {
			j = i+1; 
			for (;j < this.lifes.length; j++) {
				isHit = this.lifes[i].sizeData.some(function(aCrood) {
					for (var k=0; k < that.lifes[j].sizeData.length; k++) {
						if (aCrood[0] === that.lifes[j].sizeData[k][0] &&
							aCrood[1] === that.lifes[j].sizeData[k][1]) {
							return true;
						}
					}
				});
				if (isHit) {
					this.lifes[i].handleHit(this.lifes[j].effect);//分别传入对对方的影响
					this.lifes[j].handleHit(this.lifes[i].effect);//分别传入对对方的影响
				}
			}
		}
	}

	return new hitCalculator();
})();


define(function(require, exports, module) {
	var Time = require('time');
	var Life = Time.extend(function() {
		this.sizeInfo;//[x,z,正反面1for正]

		this.effect = {}; // 物体属性，可定义其他物体的伤害值或其他影响

		this.constructor = function() {
			this.super();
			hitCalculator.addLife(this);
		}

		this.destory = function() {
			this.super.destory();
		}

		this.die = function() {
			hitCalculator.removeLife(this);
		}

		this.handleHit = function(effect) {

		}

		this.triggerHitCalculator = function() {
			hitCalculator.calculate();
		}
	});

	module.exports = Life;
});