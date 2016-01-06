/* 
蛇 处理蛇自身的状态，getfood生长、撞墙变短 
require();

turn left
turn right
go ahead

getfood(foodInfo);
grow(); 尾部加长

hit();
+setOrder();
+die(); 时间over 要调用Time 的die

暴走
迟钝
无敌

*/

function createMesh(geom) {

    // assign two materials
    var meshMaterial = new THREE.MeshLambertMaterial();
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial/*, wireFrameMat*/]);

    return mesh;
}

/*function pos(sizeStr) {
	var i = sizeStr.split('').map(function(i) {return parseInt(i)});
	return i;
}*/

define(function(require, exports, module) {
	var Life = require('life');
	var Snake = Life.extend(function() {

		var w,
			that = this,
			scene;

		this.head;
		this.tail;
		this.body; //shape
		this.sizeData;//[x,z,正反面1for正]
		this.nextSizeData;
		this.dir = 0; //0 - 3 -> 上 - 左 上为y轴正方向
		this.percent;
		this.segment = 20;// 一个格子分为10段

		this.constructor = function(_scene, options) {
			this.super();
			scene = _scene;
			w = scene.gridWidth,
			this.options = extend(true, {}, options);

			this.sizeData = this.nextSizeData = [[0,0,1], [0,1,1], [0,2,1], [0,3,1], [0,4,1]];
			this.nextSizeData = extend(true, [], this.sizeData);
			this.head = this._createHead();
			this.tail = this._createTail();

			this.head.position.y = 1;
			this.tail.position.y = 1;
			this.head.rotation.x = Math.PI/2;
			this.tail.rotation.x = Math.PI/2;
			this.head.castShadow = true;
			this.tail.castShadow = true;

			scene.scene.add(this.head);
			scene.scene.add(this.tail);

			move();
		}

		this._createHead = function() {
			//radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
			var headGem = new THREE.CylinderGeometry(0, w*0.4, w, 4, 1, false);
			return createMesh(headGem);
		}

		this._createTail = function() {
			var headGem = new THREE.CylinderGeometry(0, w*0.18, w, 6, 1, false);
			return createMesh(headGem);
		}

		/* 画蛇！！！！*/

		// 具体画一个格子， 提供前 自己 后三个格子位置以确定怎么画
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
									(endPoint2[0] + (endPoint1[0]-endPoint2[0])*percent) * w, 
									(endPoint2[1] + (endPoint1[1]-endPoint2[1])*percent) * w
								),
								new THREE.Vector2(endPoint2[0] * w, endPoint2[1] * w)
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
				//console.log(startAngle, endAngle);

				curve = new THREE.EllipseCurve(
					center[0]*w,  center[1]*w,            // ax, aY
					w/2, w/2,           // xRadius, yRadius
					startAngle,  endAngle,  // aStartAngle, aEndAngle
					aClockwise,            // aClockwise
					0                 // aRotation 
				);
				//console.log(percent)
			}
			return curve.getPoints(parseInt(that.segment * percent));
		}

		this._drawBody = function() {
			var pointArr = [],
				points;

			for (var i = 2; i < this.nextSizeData.length - 1; i++) {
				points = drawGrid(this.nextSizeData[i-1], this.nextSizeData[i], this.nextSizeData[i+1], 1);
				pointArr = pointArr.concat(points);
			}
			return pointArr;
		}

		this._drawFirst = function() {
			return drawGrid(this.nextSizeData[0], this.nextSizeData[1], this.nextSizeData[2], this.percent);
		}

		this._drawLast = function() {
			var l = this.nextSizeData.length,
				sl = this.sizeData.length,
				nowLast = this.nextSizeData[l-1];
				nowPenult = this.nextSizeData[l-2];
				prevLast = this.sizeData[sl-1];

			// 如果两次长度不一
			if (l !== sl) {
				prevLast = (nowLast[0] + (nowLast[0]-nowPenult[0])) + '' + 
							(nowLast[1] + (nowLast[1]-nowPenult[1])) + '' + 1;
			}
 
			return drawGrid(prevLast, nowLast, nowPenult, 1 - this.percent).reverse();
		}


		
		this._draw = function() {
			var points = [];

			scene.scene.remove(this.body);

			points = points.concat(this._drawFirst());
			points = points.concat(this._drawBody());
			points = points.concat(this._drawLast());
			points = points.map(function(vec) {
				return (new THREE.Vector3(vec.x, 1, vec.y));
			});
			//console.log(points);
            this.body = createMesh(new THREE.TubeGeometry(new THREE.SplineCurve3(points), 50, w*0.18, 6, false));
            this.body.castShadow = true;

            this._setHeadTailPos(this.head, points[0], points[1]);
            this._setHeadTailPos(this.tail, points[points.length-1], points[points.length-2]);

            scene.scene.add(this.body);
		}

		this._setHeadTailPos = function(mesh, point1, point2) {
			var angle = Math.atan((point1.z-point2.z)/(point1.x-point2.x));

			if (point1.x < point2.x) {
				angle += Math.PI;
			}

			angle -= 0.5 * Math.PI;

			var scale = (0.5*w)/Math.sqrt((point1.x-point2.x)*(point1.x-point2.x)+(point1.z-point2.z)*(point1.z-point2.z));

			mesh.position.x = point1.x + (point1.x-point2.x)*scale;
			mesh.position.z = point1.z + (point1.z-point2.z)*scale;
			mesh.rotation.z = angle;



			if (mesh == this.head) {
				var relativeCameraOffset = new THREE.Vector3(0, -100, -100);

				var cameraOffset = relativeCameraOffset.applyMatrix4( this.head.matrixWorld );

				scene.camera.position.x = cameraOffset.x;
				scene.camera.position.y = cameraOffset.y;
				scene.camera.position.z = cameraOffset.z;

				scene.camera.lookAt(this.head.position);
				//console.log(this.sizeData);
				//console.log(this.nextSizeData.toString());
				scene.spotLight.target = this.head;
				//scene.spotLight.position.set(this.head.position.x,60,this.head.position.z);
			}
 		}
		/* over 画蛇！！！！*/

		that.a = 1;
		document.addEventListener('keydown', function(e) {
			if  (e.which == 37) {
				that.a = (that.dir+1);
			} else if (e.which == 39) {
				that.a = (that.dir-1);
			}
		});

		time = 50;
		function move() {time--

			that.sizeData = that.nextSizeData;

			that.setOrder(that.a);
			that.setNextData();
			that.nextSizeData.pop();

			//console.log(that.nextSizeData.toString())

			that.percent = 0;

			var a = function() {
				if (that.percent < 1) {
					that.percent+=0.1;that._draw();
					setTimeout(a, 30);					
				} else if (time > 0){
					move();
				}
			};
			a();

			// 判断碰撞
			/*that.addTween({'percent': 0}, {'percent': 1}, that.options.speed, function(current) { console.log(current);
				that.percent = current.percent;
				that._draw(current);
			}, move);*/
		}

		this.goLeft = function() {
			this.setOrder(this.dir--);
		}

		this.goRight = function() {
			this.setOrder(this.dir++);
		}

		//设置 dir 方向 
		this.setOrder = function(dir) {
			dir = (dir+4) % 4;
			if (dir === (this.dir - 2) % 4) {
				dir = this.dir;
			}
			this.dir = dir;
		}

		this.setNextData = function() {
			this.nextSizeData = extend(true, [], this.sizeData);

			var newGrid = extend(true, [], this.nextSizeData[0]);
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
			this.nextSizeData.unshift(newGrid);	
		}
	});






	module.exports = Snake;
});












