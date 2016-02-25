define(function(require, exports, module) {
	foodFactory = {
		'normal': require('./food-normal'),
		'double': require('./food-double'),
		'accelerator': require('./food-accelerator'),
		'life': require('./food-life'),

		getFood: function(scene, type, foodData, callback) {
			return new foodFactory[type](scene, foodData, callback);
		}
	}

	module.exports = foodFactory;
});