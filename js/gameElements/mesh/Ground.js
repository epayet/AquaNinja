var Constants = require("../../Constants");

var Ground = function(rank) {
    this.mesh = createMesh(rank);
};

Ground.prototype.update = function(delta) {
    this.mesh.position.z += delta * 10;
};

Ground.setPositionForRank = function(rank, plane) {
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = rank * -Constants.TerrainSize.height;
};

function createMesh(rank) {
    var planeTexture = THREE.ImageUtils.loadTexture(Constants.Paths.Skins.Sand);
    var planeGeometry = new THREE.PlaneGeometry(Constants.TerrainSize.width,Constants.TerrainSize.height);

    var colors = ["red", "green", "blue"];
    var planeMaterial = new THREE.MeshLambertMaterial({color: colors[rank]});
    planeMaterial.ambient = planeMaterial.color;

    //var planeMaterial = new THREE.MeshPhongMaterial({map: planeTexture});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //plane.receiveShadow = true;

//rotate and position the plane
    Ground.setPositionForRank(rank, plane);
    return plane;
}

module.exports = Ground;