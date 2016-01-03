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


function pos(sizeStr) {
	var i = sizeStr.split('').map(function(i) {return parseInt(i)});
	return i;
}

define(function(require, exports, module) {
	var Life = require('life');
	var Snake = Life.extend(function(scene, options) {

		var w = scene.gridWidth,
			that = this;

		this.head;
		this.tail;
		this.body; //shape
		this.sizeData = [[0,0,1], [0,1,1], [0,2,1], [0,3,1]];//[x,z,正反面1for正]
		this.nextSizeData;
		this.dir = 0; //0 - 3 -> 上 - 左 上为y轴正方向
		this.percent;

		this.contructor = function(scene, options) {

			this.options = extend(true, {}, options);

			this.sizeData = ['001', '011', '021', '031'];
			this.nextSizeData = extend(true, [], this.sizeData);
			this.head = this._createHead();
			this.tail = this._createTail();

			scene.add(this.head);
			scene.add(this.tail);
		}

		this._createHead = function() {
			//radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded
			var headGem = new THREE.CylinderGeometry(0, w*0.8, w*0.8, 6, 2, false);
			return createMesh(headGem);
		}

		this._createTail = function() {
			var headGem = new THREE.CylinderGeometry(w*0.5, 0, w, 6, 2, false);
			return createMesh(headGem);
		}

		/* 画蛇！！！！*/

		// 具体画一个格子， 提供前 自己 后三个格子位置以确定怎么画
		function drawGrid(prev, now, next, percent) {	
			var percent = percent || 1;
			var pos1 = pos(prev);
			var pos2 = pos(now);
			var pos3 = pos(next);
			var endPoint1 = [(pos2[0]+pos1[0])/2, (pos2[1]+pos1[1])/2];
 			var endPoint2 = [(pos3[0]+pos2[0])/2, (pos3[1]+pos2[1])/2];

			
			if (endPoint1[0] === endPoint2[0] || endPoint1[1] === endPoint2[1]) {
				// 画直线
				var line = new THREE.LineCurve(
								new THREE.Vector2(endPoint1[0] * w, endPoint1[1] * w),
								new THREE.Vector2(endPoint2[0] * w, endPoint2[1] * w),
							);

			} else {
				// 画圆弧

				// 圆心
				var center = [(pos3[0]+pos1[0])/2, (pos3[1]+pos1[1])/2],
					startAngle = 0,
					endAngle - 0;

				// 点1 和 点3 的差
				var t = [pos3[0]-pos1[1], pos3[1]-pos1[1]];

				if (t[0] < 0 && t[1] > 0) {
					// 左上 
					startAngle = 1.5 * Math.PI;
					endAngle = startAngle - (0.5 * Math.PI * percent);
				} else if (t[0] > 0 && t[1] > 0) {
					// 右上
					startAngle = 1.5 * Math.PI;
					endAngle = startAngle + (0.5 * Math.PI * percent);
				} else if t[0] > 0 && t[1] < 0 {
					// 右下
					startAngle = Math.PI;
					endAngle = startAngle + (0.5 * Math.PI * percent);
				} else if t[0] < 0 && t[1] < 0 {
					// 左下
					startAngle = 2 * Math.PI;
					endAngle = startAngle - (0.5 * Math.PI * percent);
				}


				var curve = new THREE.EllipseCurve(
					center[0],  center[1],            // ax, aY
					w/2, w/2,           // xRadius, yRadius
					startAngle,  endAngle,  // aStartAngle, aEndAngle
					false,            // aClockwise
					0                 // aRotation 
				);
			}
		}

		this._drawBody = function() {
			for (var i = 1; i < this.nextSizeData.length -2; i++) {
				drawGrid(this.nextSizeData[0], this.nextSizeData[1], this.nextSizeData[2], 1);
			}
		}

		this._drawFirst = function() {
			drawGrid(this.nextSizeData[0], this.nextSizeData[1], this.nextSizeData[2], this.percent);
		}

		this._drawLast = function() {
			var l = this.nextSizeData.length,
				sl = this.sizeData.length,
				nowLast = this.nextSizeData[l-1];
				nowPenult = this.nextSizeData[l-2];
				prevLast = this.sizeData[sl];

			// 如果两次长度不一
			if (l !== sl) {
				prevLast = (nowLast[0] + (nowLast[0]-nowPenult[0])) + '' + 
							(nowLast[1] + (nowLast[1]-nowPenult[1])) + '' + 1;
			}
 
			drawGrid(prevLast, nowLast, nowPenult, 1 - this.percent);
		}

		this._draw = function(percent) {
			scene.remove(this.body);
			var shape = new THREE.Shape();

			this._drawFirst();
			this._drawBody();
			this._drawLast();

            this.body = new THREE.TubeGeometry(new THREE.SplineCurve3(shape.createPointsGeometry(10).vertices), 50, 3, 8, false);
		}

		this._setHeadTailPos = function(cylinder, angle, size) {

		}
		/* over 画蛇！！！！*/


		function move() {
			// 判断碰撞
			that.addTween({'percent': 0}, {'percent': 1}, that.options.speed, function(current) {
				that._draw(current);
			}, move);
		}

		this._grow = function(length) {}

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

			this.nextSizeData = extend(true, [], this.sizeData);

			var newGrid = this.nextSizeData[0].split('').map(function(i) {return parseInt(i)});
			switch (dir) {
				case 0:
					newGrid[1]--;
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
			this.nextSizeData.shift(newGrid.join(''));
			this.dir = dir;
		}
	});






	module.exports = Snake;
});












