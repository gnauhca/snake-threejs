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
function createMesh(geom, color) {
	var color = color || 0xffffff;

    // assign two materials
    var meshMaterial = new THREE.MeshLambertMaterial({"color": color});
    meshMaterial.side = THREE.DoubleSide;
    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

    return mesh;
}

// set head tail position


define(function(require, exports, module) {
	var Life = require('life');
	var Snake = Life.extend(function(scene, options) {

		var w = scene.gridWidth;

		this.head;
		this.tail;
		this.sizeData = [[0,0,1], [0,1,1], [0,2,1], [0,3,1]];//[x,z,正反面1for正]
		this.nextSizeData;
		this.dir = 0; //0 - 3 -> 上 - 左 上为y轴正方向

		this.contructor = function() {
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

		function getBody(shape) {

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
					headGrid[1]--;
					break;
				case 1:
					headGrid[1]++;
					break;
				case 2:
					headGrid[1]++;
					break;
				case 3:
					headGrid[1]--;
			}
			this.nextSizeData.shift(newGrid.join(''));
			this.dir = dir;
		}
	});








	// private
	function setHeadTailPos(cylinder, angle, size) {
		
	}


	module.exports = Snake;
});












