var StepMesh = require('./StepMesh');

function Pyraken(step) {
    StepMesh.call(this, step);
}

Pyraken.prototype = Object.create(StepMesh.prototype);

Pyraken.prototype.createMesh = function() {
    this.mesh = createMesh();
};

module.exports = Pyraken;

function createMesh() {
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red', transparent: true});
    cubeMaterial.ambient = cubeMaterial.color;
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}