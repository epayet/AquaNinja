var Constants = require("../../Constants");

var Ground = function(rank) {
    this.mesh = createMesh(rank);
    console.log(this.mesh);
};

Ground.prototype.update = function(delta) {
    //this.mesh.position.z += delta * 10;
    //console.log(this.mesh.position);
};

function createMesh(rank) {
    var planeTexture = THREE.ImageUtils.loadTexture(Constants.Paths.Skins.Sand);
    var planeGeometry = new THREE.PlaneGeometry(Constants.TerrainSize.width,Constants.TerrainSize.height);

    var colors = ["rgb(255,0,0)", "rgb(0,255,0)", "rgb(0,0,255)"];
    var planeMaterial = new THREE.MeshLambertMaterial({color: colors[rank]});
    planeMaterial.ambient = planeMaterial.color;

    //var planeMaterial = new THREE.MeshPhongMaterial({map: planeTexture});

    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    //plane.receiveShadow = true;

//rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = rank * -Constants.TerrainSize.height;
    return plane;
}

module.exports = Ground;