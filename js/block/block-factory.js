define(function(require, exports, module) {

	blockFactory = {
		'normal': require('./block-normal'),

		getBlock: function(scene, type, blockData, callback) {
			return new blockFactory[type](scene, blockData, callback);
		}
	}


	module.exports = blockFactory;
});