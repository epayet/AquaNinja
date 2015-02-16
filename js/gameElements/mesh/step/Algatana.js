var stepFactory = require('./stepFactory');
var Constants = require('../../../constants');

function Algatana(stepRank) {
    this.mesh = createMesh(stepRank);
}

Algatana.prototype.update = function(delta) {
    //this.mesh.position.z += delta * 10;
};

module.exports = Algatana;

function createMesh(rank) {
    var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: 'green', transparent: true});
    cubeMaterial.ambient = cubeMaterial.color;
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = - 20;
    cube.position.z = rank * -Constants.distanceBetweenSteps;
    return cube;
}