define(function(require, exports, module) {
	var Life = require('life.js');
	var Block = Life.extend(function() {
		this.destoryCallback;
		this.mesh;

		this.constructor = function(scene, blockData, _destoryCallback) {
			// 创建
			this.super();
			this.scene = scene;
			this.destoryCallback = _destoryCallback;
			this.init(blockData);
		}

		this.init = function(blockData) {

		}

		this.destory = function() {
			this.super.destory();
			this.destoryCallback && this.destoryCallback(this);
		}
	});




	blockFactory = {
		'normal': Block.extend(function() {
			var that = this;
			var mesh;
			this.aname = 'block';
			this.mesh;
			this.frameTask;

			this.constructor = function(scene, blockData, _destoryCallback) {
				this.super(scene, blockData, _destoryCallback);

			}

			this.init = function(blockData) {
		        // create a cube
		        var cubeGeometry = new THREE.BoxGeometry(1,1,1);

		        mesh = createMesh(cubeGeometry, '#997');

		        this.sizeData = [blockData.size];
		        mesh.position.x = blockData.size[0];
		        mesh.position.z = blockData.size[1];
		        mesh.position.y = 0;

		        // add the cube to the scene
		        this.scene.scene.add(mesh);
			}

			this.handleHit = function(effect) {
				// 可以根据effect 判断冲撞对象是否能撞烂自己
			}

			this.destory = function() {
				this.super.destory();
				this.scene.scene.remove(mesh);
			}

		}),

		getBlock: function(scene, type, blockData, callback) {
			return new blockFactory[type](scene, blockData, callback);
		}
	}


	module.exports = blockFactory;
});