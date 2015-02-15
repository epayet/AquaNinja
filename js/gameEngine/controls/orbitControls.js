var camera = require("../gameEngine").getCamera();
var cameraControl = new THREE.OrbitControls(camera);

module.exports = {
    update: function() {
        cameraControl.update();
    }
};