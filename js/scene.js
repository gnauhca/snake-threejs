/* 场景 包含灯光 相机*/

define(function(require, exports, module) {


var Time = require('time');

var Scene = Time.extend(function () {
	var that = this,
		elem;

	this.width = 100;
	this.height = 100;

	this.constructor = function(_elem) {
		this.super();
		elem = _elem;
	}

	this.initializer = function() {
		/* render */
		var webGLRenderer = new THREE.WebGLRenderer();
		webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
		webGLRenderer.setSize(window.innerWidth, window.innerHeight);
		webGLRenderer.shadowMapEnabled = true;
		elem.appendChild(webGLRenderer.domElement);

		this.scene = new THREE.Scene();
        // show axes in the screen
        var axes = new THREE.AxisHelper(20);
        this.scene.add(axes);

		/* camera */
		this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        this.camera.position.x = 0;
        this.camera.position.y = 30;
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
        spotLight.shadowCameraFar = 100;
        spotLight.shadowCameraFov = 20;
        spotLight.shadowCameraVisible = true;    
		spotLight.intensity = 0.8;
	    spotLight.position.set(0, 10, -0);
	    spotLight.angle = 1.3;

        this.spotLight = spotLight;
	    //this.scene.add(this.spotLight);



        var pointColor = "#ffffff";
        var directionalLight = new THREE.DirectionalLight(pointColor);
        var lightTarget = new THREE.Object3D();
        lightTarget.position = new THREE.Vector3(0,0,0);
        //directionalLight.shadowCameraVisible = true;
        directionalLight.castShadow = true;
        directionalLight.intensity = 0.5;
        directionalLight.position.set(5, 5, 5);
        directionalLight.shadowCameraNear = 0;
        directionalLight.shadowCameraFar = 10; 
        directionalLight.shadowCameraLeft = -10;
        directionalLight.shadowCameraRight = 10;
        directionalLight.shadowCameraTop = 10;
        directionalLight.shadowCameraBottom = -10;

        directionalLight.shadowMapHeight = 500;
        directionalLight.shadowMapWidth = 500;
        //directionalLight.target = lightTarget;

        this.directionalLight = directionalLight;
        this.scene.add(directionalLight);



		// create the ground plane
		var planeGeometry = new THREE.PlaneGeometry(this.width, this.height, this.width, this.height);
		var planeMaterial = new THREE.MeshLambertMaterial({/*color: 0xffffff,*/ wireframe: true});
		var planeTexture = new THREE.ImageUtils.loadTexture( 'images/floor.jpg' );
        planeTexture.wrapS = planeTexture.wrapT = THREE.RepeatWrapping;
        planeTexture.repeat.set( this.width/4, this.width/4 );
        planeMaterial.map = planeTexture;
		var plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.receiveShadow = true;

		// rotate and position the plane
		plane.position.x = 0;
		plane.position.y = -1;
		plane.position.z = 0;
		plane.rotation.x = -Math.PI * 0.5;
		this.scene.add(plane);

		setTimeout(function() {webGLRenderer.render(that.scene, that.camera);}, 0);
		var frameTask = this.addFrameTask(function() {
			webGLRenderer.render(that.scene, that.camera);
		});
	}

});

module.exports = Scene;


});