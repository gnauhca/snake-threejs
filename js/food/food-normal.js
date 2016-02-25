define(function(require, exports, module) {
	var Food = require('./food');
	var FoodClass = Food.extend(function() {
		var that = this;
		var mesh;
		this.aname = 'food';
		this.mesh;
		this.frameTask;
		this.effect = {
			'': ''
		}

		this.constructor = function(scene, foodData, _destoryCallback) {
			this.super(scene, foodData, _destoryCallback);
		}

		this.init = function(foodData) {
	        // create a cube
	        var cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

	        mesh = createMesh(cubeGeometry, '#019AA0');

	        //console.log(foodData)
	        this.sizeData = [foodData.size];
	        // position the cube
	        //console.log(foodData);
	        mesh.position.x = foodData.size[0];
	        mesh.position.z = foodData.size[1];
	        mesh.position.y = 0;

	        console.log(foodData.size);

	        // add the cube to the scene
	        this.scene.scene.add(mesh);

			this.frameTask = this.addFrameTask(function() {
	            mesh.rotation.x += 0.03;
	            mesh.rotation.y += 0.03;
	            mesh.rotation.z += 0.03;
			});
		}

		this.handleHit = function(effect) {
			var r = 0.03,
				k = 0;
			this.frameTask = this.addFrameTask(function() {
				r -= (k+=0.001);
	            mesh.rotation.x += r;
	            mesh.rotation.y += r;
	            mesh.rotation.z += r;
			});
			that.die();
			setTimeout(function() {
				that.destory();
			}, 1000);
		}

		this.destory = function() {
			this.super.destory();
			this.scene.scene.remove(mesh);
		}

	});

	module.exports = FoodClass;
});