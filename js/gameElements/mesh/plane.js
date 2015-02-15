var Constants = require("../../Constants");

var planeTexture = THREE.ImageUtils.loadTexture(Constants.Paths.Skins.Sand);
var planeGeometry = new THREE.PlaneGeometry(Constants.TerrainSize,Constants.TerrainSize);
var planeMaterial = new THREE.MeshPhongMaterial({map: planeTexture});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

//rotate and position the plane
plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 20;

var deltaPlane = 0;

module.exports = {
    mesh: plane,
    update: function(delta) {
        deltaPlane += delta;
        plane.position.z += delta * 10;

        if(deltaPlane >= 0.2){
            deltaPlane = 0;
            //plane.position.z++;
        }
    }
};