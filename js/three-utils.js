
function createMesh(geom, color) {

    // assign two materials
    var meshMaterial = new THREE.MeshLambertMaterial({color: (color || 0xffffff)});
    meshMaterial.side = THREE.DoubleSide;

    var wireFrameMat = new THREE.MeshBasicMaterial();
    wireFrameMat.wireframe = true;

    // create a multimaterial
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial/*, wireFrameMat*/]);
    mesh.castShadow = true;

    return mesh;
}