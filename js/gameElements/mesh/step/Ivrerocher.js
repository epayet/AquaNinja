var StepMesh = require('./StepMesh');

function Ivrerocher(step) {
    StepMesh.call(this, step);
}

Ivrerocher.prototype = Object.create(StepMesh.prototype);

Ivrerocher.prototype.createMesh = function() {
    this.mesh = createMesh();
};

module.exports = Ivrerocher;

function createMesh() {
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'blue', transparent: true});
    cubeMaterial.ambient = cubeMaterial.color;
    return new THREE.Mesh(cubeGeometry, cubeMaterial);
}