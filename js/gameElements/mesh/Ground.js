var Constants = require("../../Constants");

var Ground = function() {
    this.mesh = createMesh();
};

Ground.prototype.update = function(delta) {
    //this.mesh.position.z += delta * 10;
};

function createMesh() {
    var planeTexture = THREE.ImageUtils.loadTexture(Constants.Paths.Skins.Sand);
    var planeGeometry = new THREE.PlaneGeometry(Constants.TerrainSize.width,Constants.TerrainSize.height);
    var planeMaterial = new THREE.MeshPhongMaterial({map: planeTexture});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

//rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    return plane;
}

module.exports = Ground;