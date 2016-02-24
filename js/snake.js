/* 
蛇 处理蛇自身的状态，getfood生长、撞墙变短 
require();

turn left
turn right
go ahead

getfood(foodInfo);
grow(); 尾部加长

hit();
+setDir();
+die(); 时间over 要调用Time 的die

暴走
迟钝
无敌

*/
define(function(require, exports, module) {

var drawSphereByPoints = (function() {
	var spheres = [],
		radius = 0.15,
		seg = 8;

	return function(points) {
		var meshs = [],
			mesh;

		points.forEach(function(point, i) {
			if (spheres[i]) {
				mesh = spheres[i];
			} else {
				mesh = createMesh(new THREE.SphereGeometry(radius, seg, seg), 0xabcdef);
				spheres.push(mesh);
			}
			mesh.position.set(point.x, point.y, point.z);
			meshs.push(mesh);
		});
		return meshs;
	}	
})();


var getLinePoint = (function() {
	var croodPoints = [],
		percent, //单位
		segment = 10;

	function drawGrid(prev, now, next, percent) {
		var percent = percent || 1;
		var pos1 = prev;
		var pos2 = now;
		var pos3 = next;
		var endPoint1 = [(pos2[0]+pos1[0])/2, (pos2[1]+pos1[1])/2];
		var endPoint2 = [(pos3[0]+pos2[0])/2, (pos3[1]+pos2[1])/2];
		var curve;

		
		if (endPoint1[0] === endPoint2[0] || endPoint1[1] === endPoint2[1]) {
			// 画直线
			curve = new THREE.LineCurve(
							new THREE.Vector2(
								(endPoint2[0] + (endPoint1[0]-endPoint2[0])*percent), 
								(endPoint2[1] + (endPoint1[1]-endPoint2[1])*percent)
							),
							new THREE.Vector2(endPoint2[0], endPoint2[1])
						);

		} else {
			// 画圆弧

			// 圆心
			var center = [(pos3[0]+pos1[0])/2, (pos3[1]+pos1[1])/2],
				startAngle = 0,
				endAngle = 0;

			// 点1 和 点3 的差
			var t13 = [pos1[0]-pos3[0], pos1[1]-pos3[1]];
			var t12 = [pos1[0]-pos2[0], pos1[1]-pos2[1]];
			var aClockwise = false; // 顺逆时针┌ └ ┐ ┘

			if (t13[0] < 0 && t13[1] > 0 && t12[0] === 0) {
				// 左上└
				endAngle = 1.5*Math.PI;
				aClockwise = false;
			} else if (t13[0] < 0 && t13[1] > 0 && t12[1] === 0) {
				// 左上 ┐
				endAngle = 0;
				aClockwise = true;
			} else if (t13[0] > 0 && t13[1] > 0 && t12[0] === 0) {
				// 右上 ┘
				endAngle = 1.5*Math.PI;
				aClockwise = true;
			} else if (t13[0] > 0 && t13[1] > 0 && t12[1] === 0) {
				// 右上 ┌
				endAngle = Math.PI;
				aClockwise = false;
			} else if (t13[0] > 0 && t13[1] < 0 && t12[0] === 0) {
				// 右下 ┐
				endAngle = 0.5*Math.PI;
				aClockwise = false;
			} else if (t13[0] > 0 && t13[1] < 0 && t12[1] === 0) {
				// 右下 └
				endAngle = Math.PI;
				aClockwise = true;
			} else if (t13[0] < 0 && t13[1] < 0 && t12[0] === 0) {
				// 左下 ┌
				endAngle = 0.5*Math.PI;
				aClockwise = true;
			} else if (t13[0] < 0 && t13[1] < 0 && t12[1] === 0) {
				// 左下 ┘
				endAngle = 0;
				aClockwise = false;
			}


			startAngle = endAngle + Math.PI*0.5*(aClockwise?1:-1)*percent;

			curve = new THREE.EllipseCurve(
				center[0],  center[1],            // ax, aY
				0.5, 0.5,           // xRadius, yRadius
				startAngle,  endAngle,  // aStartAngle, aEndAngle
				aClockwise,            // aClockwise
				0                 // aRotation 
			);
		}
		return curve.getPoints(parseInt(segment * percent));
	}

	function drawBody() {
		var pointArr = [],
			points;

		for (var i = 2; i < croodPoints.length - 2; i++) {
			points = drawGrid(croodPoints[i-1], croodPoints[i], croodPoints[i+1], 1);
			pointArr = pointArr.concat(points);
		}
		return pointArr;
	}

	function drawFirst() {
		return drawGrid(croodPoints[0], croodPoints[1], croodPoints[2], percent);
	}

	function drawLast() {
		return drawGrid(croodPoints[croodPoints.length-1], croodPoints[croodPoints.length-2], croodPoints[croodPoints.length-3], 1.00000001 - percent).reverse();
	}


	return (function draw(_croodPoints, _percent) {
		croodPoints = _croodPoints;
		percent = _percent;

		var points = [];
		points = points.concat(drawFirst());
		points = points.concat(drawBody());
		if (_croodPoints.length > 3)
		points = points.concat(drawLast());
		return points;
	});
})();







var Life = require('life');
var Snake = Life.extend(function() {

	var that = this,
		scene;

	this.head;
	this.tail;
	this.bodys=[]; //shape
	this.historySizeData = [];//历史位置信息
	this.sizeData=[];
	this.nextSizeData=[]; // 下一位置信息
	this.dir = 2; //0 - 3 -> 上 - 左 上为y轴正方向
	this.nextDir = 2; 
	this.options = {};
	

	this.constructor = function(_scene) {
		this.super();
		scene = _scene;

		this.head = createHead();
		this.tail = createTail();

		this.head.position.y = 0;
		this.tail.position.y = 0;
		this.head.rotation.x = Math.PI/2;
		this.tail.rotation.x = Math.PI/2;

		scene.scene.add(this.head);
		scene.scene.add(this.tail);

		initEvent();

		function createHead() {
			//radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
			var headGem = new THREE.CylinderGeometry(0, 0.4, 1, 4, 1, false);
			return createMesh(headGem, 0xabcdef);
		}

		function createTail() {
			var headGem = new THREE.CylinderGeometry(0, 0.18, 1, 6, 1, false);
			return createMesh(headGem, 0xabcdef);
		}
	}


	/*
	 *	初始化控制事件
	 */
	function initEvent() {
		document.addEventListener('keydown', function(e) {
			e.preventDefault();
			if  (e.which == 37) {
				that.nextDir = (that.dir+1);
			} else if (e.which == 39) {
				that.nextDir = (that.dir-1);
			}
		});			
	}
	/*
	 * 每个关卡开始时候由game 调用 game会相应传入snake的关卡配置
	 */
	this.setUp = function(snakeOptions) {
		this.sizeData = [[0,0,0], [0,1,0], [0,2,0], [0,3,0], [0,4,0]];
		this.historySizeData = [];
		this.options = extend(true, {}, snakeOptions);
	}

	this.start = function() {
		move(); 
	}

	//游戏退出时候由game对象通知
	this.exit = function() {
		
	}


	/* 画蛇！！！！*/

	// 具体画一个格子， 提供前 自己 后三个格子位置以确定怎么画
	this._draw = function(percent) {

		// 从坐标获得平滑线条的点信息
		var points = [];
		points = getLinePoint(this.sizeData, percent);
		points = points.map(function(vec) {
			return (new THREE.Vector3(vec.x, 0, vec.y));
		});

		this.bodys.forEach(function(sphere) {
			scene.scene.remove(sphere);
		});
        this.bodys = drawSphereByPoints(points);
        this.bodys.forEach(function(sphere) {
			scene.scene.add(sphere);
		});

        this._setHeadTailPos(this.head, points[0], points[1]);
        this._setHeadTailPos(this.tail, points[points.length-1], points[points.length-2]);

	}

	this._setHeadTailPos = function(mesh, point1, point2) {
		var angle = Math.atan((point1.z-point2.z)/(point1.x-point2.x));

		if (point1.x < point2.x) {
			angle += Math.PI;
		}

		angle -= 0.5 * Math.PI;

		var scale = (0.5)/Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.z-point2.z)*(point1.z-point2.z));

		mesh.position.x = point1.x + (point1.x-point2.x)*scale;
		mesh.position.z = point1.z + (point1.z-point2.z)*scale;
		mesh.rotation.z = angle;


		//camera
		/*if (mesh == this.head) {
			var relativeCameraOffset = new THREE.Vector3(0, -8, -5);

			var cameraOffset = relativeCameraOffset.applyMatrix4( this.head.matrixWorld );

			scene.camera.position.x = cameraOffset.x;
			scene.camera.position.y = cameraOffset.y;
			scene.camera.position.z = cameraOffset.z;

			scene.camera.lookAt(this.head.position);
			scene.directionalLight.position.set(this.head.position.x +2, 5, this.head.position.z +2);
			scene.directionalLight.target = this.head;
		}*/
	}
	/* over 画蛇！！！！*/

	time = 100;//for test
	function move() {time--; 

		that.setDir(that.nextDir);
		that.setSize();
		// todo 判断碰撞

		//console.log(time)
		if (time > 0)
		that.addTween({'percent': 0}, {'percent': 1}, that.options.speed, function(current) {
			that._draw(current.percent);
		}, move);
	}

	//设置 dir 方向 
	this.setDir = function(dir) {
		dir = (dir+4) % 4;
		if (dir === (this.dir - 2) % 4) {
			dir = this.dir;
		}
		this.dir = dir;
	}

	// 计算下一步位置信息，此方法只unshift 一个位置，而不删除尾部最后位置（考虑到会吃到食物的情况）
	this.setSize = function() {
		this.historySizeData.unshift(this.sizeData);//当前位置存入历史位置
		this.historySizeData.length  = this.historySizeData.length>100 ? 100:this.historySizeData.length;

		this.sizeData = extend(true, [], this.sizeData);
		var newGrid = extend(true, [], this.sizeData[0]);
		switch (this.dir) {
			case 0:
				newGrid[1]++;
				break;
			case 1:
				newGrid[0]++;
				break;
			case 2:
				newGrid[1]--;
				break;
			case 3:
				newGrid[0]--;
		}

		this.sizeData.unshift(newGrid);	
		this.sizeData.pop();

		this.super.setSize();
	}
});


module.exports = Snake;
});












