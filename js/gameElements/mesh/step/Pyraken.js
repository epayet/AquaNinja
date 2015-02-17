var StepMesh = require('./StepMesh');
var gameEngine = require('../../../gameEngine/gameEngine');
var Constants = require('../../../constants');

function Pyraken(step) {
    StepMesh.call(this, step);
}

Pyraken.prototype = Object.create(StepMesh.prototype);

Pyraken.prototype.createMesh = function() {
    this.mesh = createMesh();
};

module.exports = Pyraken;

function createMesh() {
    var mesh = gameEngine.getModel(Constants.Models.Piraken);
    mesh.rotation.y = 0.5 * Math.PI;
    mesh.position.y = 5;
    var scale = 10;
    mesh.scale.set(scale, scale*2, scale*3);
    return mesh;

    //var cubeGeometry = new THREE.BoxGeometry(6, 4, 6);
    //var cubeMaterial = new THREE.MeshLambertMaterial({color: 'red', transparent: true});
    //cubeMaterial.ambient = cubeMaterial.color;
    //return new THREE.Mesh(cubeGeometry, cubeMaterial);
}