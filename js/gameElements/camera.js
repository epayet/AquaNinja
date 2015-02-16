var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 10;
camera.position.z = 30;

//camera.rotat = 50;
//TODO :(
camera.rotationAutoUpdate = false;
camera.rotation.x = 50;

module.exports = camera;
window.camera = camera;