var stepFactory = require('./stepFactory');
var gameEngine = require('../../../gameEngine/gameEngine');

var existingMeshes = {};

module.exports = {
    get: function(step) {
        var stepType = step.state.name;
        if(!existingMeshes[stepType]) existingMeshes[stepType] = [];

        if(existingMeshes[stepType].length > 0) {
            var stepMesh = existingMeshes[stepType].pop();
            gameEngine.addSceneElement(stepMesh.mesh);
            return stepMesh;
        } else {
            return createStepMeshForTheFirstTime(step);
        }
    },
    recycle: recycle
};

function recycle(stepMesh) {
    existingMeshes[stepMesh.stepType].push(stepMesh);
}

function createStepMeshForTheFirstTime(step) {
    var stepMesh = stepFactory(step);

    gameEngine.addSceneElement(stepMesh.mesh);
    gameEngine.addRenderElement(stepMesh);
    gameEngine.addCameraObservationElement(stepMesh.mesh, function (mesh) {
        stepMesh.resetPosition();
        gameEngine.removeSceneElement(mesh);
        recycle(stepMesh);
    });
    return stepMesh;
}