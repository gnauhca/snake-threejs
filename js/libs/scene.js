/* 场景 包含灯光 相机*/


var Time = require('time');

var Scene = Time.extend(function (elem) {
	var that = this;

	this.width = 100;
	this.height = 100;
	this.gridWidth = 10;

	/* render */
	var webGLRenderer = new THREE.WebGLRenderer();
	webGLRenderer.setClearColor(new THREE.Color(0x000, 1.0));
	webGLRenderer.setSize(window.innerWidth, window.innerHeight);
	webGLRenderer.shadowMapEnabled = true;
	elem.appendChild(renderer.domElement);

	this.scene = new THREE.Scene();

	/* camera */
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
	this.scene.add(this.camera);

	/* light */
	this.spotLight = new THREE.SpotLight(0xffffff);
    this.spotLight.position.set(0, 1000, 0);
    this.scene.add(spotLight);


	// create the ground plane
	var planeGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: true});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	// rotate and position the plane
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;
	scene.add(plane);

	var frameTask = this.addFrameTask(function(fn) {
		webGLRenderer.render(this.scene, this.camera);
	});
});