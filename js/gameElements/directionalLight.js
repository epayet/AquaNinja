var directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.position.x = 0.5;
directionalLight.position.y = 0.5;
directionalLight.position.z = 0.5;
directionalLight.position.normalize();

module.exports = directionalLight;