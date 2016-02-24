define(function(require, exports, module) {
	var Life = require('life.js');
	var Food = Life.extend(function() {
		this.destoryCallback;
		this.mesh;

		this.constructor = function(scene, foodData, _destoryCallback) {
			// 创建
			this.super();
			this.scene = scene;
			this.destoryCallback = _destoryCallback;
			this.init(foodData);
		}

		this.init = function(foodData) {

		}

		this.destory = function() {
			this.super.destory();
			this.destoryCallback && this.destoryCallback(this);
		}
	});




	foodFactory = {
		'normal': Food.extend(function() {
			var that = this;
			var mesh;
			this.aname = 'food'
			this.mesh;
			this.frameTask;

			this.constructor = function(scene, foodData, _destoryCallback) {
				this.super(scene, foodData, _destoryCallback);

			}

			this.init = function(foodData) {
		        // create a cube
		        var cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

		        mesh = createMesh(cubeGeometry, foodData.color);

		        //console.log(foodData)
		        this.sizeData = [foodData.size];
		        // position the cube
		        //console.log(foodData);
		        mesh.position.x = foodData.size[0];
		        mesh.position.z = foodData.size[1];
		        mesh.position.y = 0;


		        // add the cube to the scene
		        this.scene.scene.add(mesh);

				this.frameTask = this.addFrameTask(function() {
		            mesh.rotation.x += 0.03;
		            mesh.rotation.y += 0.03;
		            mesh.rotation.z += 0.03;
				});
			}

			this.handleHit = function(effect) {
				var r = 0.03;
				this.frameTask = this.addFrameTask(function() {
					r -= 0.0025
		            mesh.rotation.x += r;
		            mesh.rotation.y += r;
		            mesh.rotation.z += r;
				});
				that.die();
				setTimeout(function() {
					that.destory();
				}, 2000);
			}

			this.destory = function() {
				this.super.destory();
				this.scene.scene.remove(mesh);
			}

		}),

		getFood: function(scene, type, foodData, callback) {
			return new foodFactory[type](scene, foodData, callback);
		}
	}


	module.exports = foodFactory;
});