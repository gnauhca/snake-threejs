/* 场景 包含灯光 相机*/

define(function(require, exports, module) {


var Time = require('time');

var Scene = Time.extend(function () {
	var that = this,
		elem;

	this.width = 200;
	this.height = 200;
	this.gridWidth = 5;

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
        // show axes in the screen
        var axes = new THREE.AxisHelper(20);
        this.scene.add(axes);

		/* camera */
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.x = 0;
        this.camera.position.y = 100;
        this.camera.position.z = 0;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));
		this.scene.add(this.camera);

		/* light */

        // add subtle ambient lighting
        var ambiColor = "#111111";
        var ambientLight = new THREE.AmbientLight(ambiColor);
        this.scene.add(ambientLight);

        // spotlight
		var spotLight = new THREE.SpotLight('#ffffff');
		spotLight.castShadow = true;
        spotLight.shadowCameraNear = 2;
        spotLight.shadowCameraFar = 500;
        spotLight.shadowCameraFov = 80;
        spotLight.shadowCameraVisible = true;    
		spotLight.intensity = 1;
	    spotLight.position.set(0,300, -300);
	    spotLight.angle = 1.3;

        this.spotLight = spotLight;
	    //this.scene.add(this.spotLight);



        var pointColor = "#ffffff";
        var directionalLight = new THREE.DirectionalLight(pointColor);
        directionalLight.position.set(-40, 160, -10);
        directionalLight.castShadow = true;
        directionalLight.shadowCameraNear = 2;
        directionalLight.shadowCameraFar = 200;
        directionalLight.shadowCameraLeft = -1000;
        directionalLight.shadowCameraRight = 1000;
        directionalLight.shadowCameraTop = 1000;
        directionalLight.shadowCameraBottom = -1000;

        directionalLight.distance = 0;
        directionalLight.intensity = 0.8;
        directionalLight.shadowMapHeight = 1024;
        directionalLight.shadowMapWidth = 1024;

        this.scene.add(directionalLight);

        var pointColor = "#ffffff";
        var directionalLight = new THREE.DirectionalLight(pointColor);
        directionalLight.position.set(40, 160, 10);
        directionalLight.castShadow = true;
        directionalLight.shadowCameraNear = 2;
        directionalLight.shadowCameraFar = 200;
        directionalLight.shadowCameraLeft = -1000;
        directionalLight.shadowCameraRight = 1000;
        directionalLight.shadowCameraTop = 1000;
        directionalLight.shadowCameraBottom = -1000;

        directionalLight.distance = 0;
        directionalLight.intensity = 0.5;
        directionalLight.shadowMapHeight = 1024;
        directionalLight.shadowMapWidth = 1024;

        this.scene.add(directionalLight);



		// create the ground plane
		var planeGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width/this.gridWidth, this.height/this.gridWidth);
		var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: true});
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;

		// rotate and position the plane
		plane.position.x = 0;
		plane.position.y = 0;
		plane.position.z = 0;
		plane.rotation.x = -Math.PI * 0.5;
		this.scene.add(plane);


		var frameTask = this.addFrameTask(function() {
			webGLRenderer.render(that.scene, that.camera);
		});
	}

});

module.exports = Scene;


});