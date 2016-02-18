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
			var w,
				that = this;

			this.mesh;
			this.frameTask;

			this.constructor = function(scene, foodData, _destoryCallback) {
				w = scene.gridWidth; 
				this.super(scene, foodData, _destoryCallback);

			}

			this.init = function(foodData) {
		        // create a cube
		        var cubeGeometry = new THREE.BoxGeometry(0.5*w, 0.5*w, 0.5*w);

		        this.mesh = createMesh(cubeGeometry, foodData.color);

		        //console.log(foodData)
		        this.sizeData = [foodData.size];
		        // position the cube
		        this.mesh.position.x = foodData.size[0]*w;
		        this.mesh.position.z = foodData.size[1]*w;
		        this.mesh.position.y = w;


		        // add the cube to the scene
		        this.scene.scene.add(this.mesh);

				this.frameTask = this.addFrameTask(function() {
		            that.mesh.rotation.x += 0.01;
		            that.mesh.rotation.y += 0.01;
		            that.mesh.rotation.z += 0.01;
				});
			}

			this.handleHit = function(effect) {
				this.frameTask = this.addFrameTask(function() {
		            that.mesh.rotation.x -= 0.22*w;
		            that.mesh.rotation.y -= 0.22*w;
		            that.mesh.rotation.z -= 0.22*w;
		            /*that.mesh.position.x += 0.01*w;
		            that.mesh.position.y += 0.01*w;
		            that.mesh.position.z += 0.01*w;*/
				});
				setTimeout(function() {
					that.destory();
				}, 800);
			}

			this.destory = function() {
				this.scene.scene.remove(this.mesh);
				this.super.destory();
			}

		}),

		getFood: function(scene, type, foodData, callback) {
			return new foodFactory[type](scene, foodData, callback);
		}
	}


	module.exports = foodFactory;
});