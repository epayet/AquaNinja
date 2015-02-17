var StepMesh = require('./StepMesh');
var gameEngine = require('../../../gameEngine/gameEngine');
var Constants = require('../../../constants');

function Algatana(step) {
    StepMesh.call(this, step);
}

Algatana.prototype = Object.create(StepMesh.prototype);

Algatana.prototype.createMesh = function() {
    this.mesh = createMesh();
};

module.exports = Algatana;

function createMesh() {
    var mesh = gameEngine.getModel(Constants.Models.Algatana);
    //mesh.rotation.z = -0.5 * Math.PI;
    mesh.position.y = 1;
    mesh.position.x = 3;
    var scale = 0.1;
    mesh.scale.set(scale, scale, scale);
    return mesh;

    //var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    //var cubeMaterial = new THREE.MeshLambertMaterial({color: 'green', transparent: true});
    //cubeMaterial.ambient = cubeMaterial.color;
    //return new THREE.Mesh(cubeGeometry, cubeMaterial);
}