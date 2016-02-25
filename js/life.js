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

	// 判断某个物体的碰撞情况
	hitCalculator.prototype.calculate = function(life) {
		var that = this;

		// 循环判断物体之间是否位置有重叠
		for (var i = 0; i < this.lifes.length; i++) {
			isHit = life.sizeData.some(function(aCrood) {
				for (var k=0; k < that.lifes[i].sizeData.length; k++) {
					if (aCrood[0] === that.lifes[i].sizeData[k][0] &&
						aCrood[1] === that.lifes[i].sizeData[k][1]) {
						return true;
					}
				}
			});
			if (isHit) {
				life.handleHit(this.lifes[i].effect);//分别传入对对方的影响
				this.lifes[i].handleHit(life);//分别传入对对方的影响
			}
		}
	}

	return new hitCalculator();
})();

/*
effect
{
	'snake': {
		'length': 2
		'score': 10
		'life': 1 //生命加成
		'time': 10 //时间加成
		'accelerate': true
		'damage': 100
	}
	'food': {
		'damage': 100
	}
	'block': {
		'damage': 100
	}
}
 */

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

		this.handleHit = function(effect) { }

		// 当物体设置位置的时候，使用hitCalculator 计算判断情况
		this.setSize = function() {
			hitCalculator.calculate(this);
		}
	});

	module.exports = Life;
});