var Constants = require('../../../constants');

function StepMesh(step) {
    this.createMesh();
    this.stepType = step.state.name;
    this.mesh.position.x = - 20;
}

StepMesh.prototype.updatePosition = function(rank) {
    //this.mesh.position.x = - 20;
    this.mesh.position.z = rank * - Constants.distanceBetweenSteps;
};

StepMesh.prototype.resetPosition = function() {
    this.mesh.position.z = 0;
    this.mesh.position.x = 20;
};

StepMesh.prototype.update = function(delta) {
    this.mesh.position.z += delta * 10;
};

module.exports = StepMesh;