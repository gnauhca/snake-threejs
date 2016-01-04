/* 场景 包含灯光 相机*/

define(function(require, exports, module) {


var Time = require('time');

var Scene = Time.extend(function () {
	var that = this,
		elem;

	this.width = 100;
	this.height = 100;
	this.gridWidth = 10;

	this.constructor = function(_elem) {
		this.super();
		elem = _elem;
	}

	this.initializer = function() {
		/* render */
		var webGLRenderer = new THREE.WebGLRenderer();
		webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
		webGLRenderer.setSize(window.innerWidth, window.innerHeight);
		webGLRenderer.shadowMapEnabled = true;
		elem.appendChild(webGLRenderer.domElement);

		this.scene = new THREE.Scene();

		/* camera */
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 100;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.scene.add(this.camera);

		/* light */
		this.spotLight = new THREE.SpotLight(0xffffff);
	    this.spotLight.position.set(0, 500, 0);
	    this.scene.add(this.spotLight);


		// create the ground plane
		var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
		var planeMaterial = new THREE.MeshBasicMaterial({color: 0x888888, wireframe: true});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;

		// rotate and position the plane
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;
		this.scene.add(plane);


		var frameTask = this.addFrameTask(function(fn) {
			webGLRenderer.render(that.scene, that.camera);
		});
	}

});

module.exports = Scene;


});