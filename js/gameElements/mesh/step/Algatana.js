var StepMesh = require('./StepMesh');

function Algatana(step) {
    StepMesh.call(this, step);
}

Algatana.prototype = Object.create(StepMesh.prototype);

Algatana.prototype.createMesh = function() {
    this.mesh = createMesh();
};

module.exports = Algatana;

function createMesh() {
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'green', transparent: true});
    cubeMaterial.ambient = cubeMaterial.color;
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}