var gameEngine = require('../../../gameEngine/gameEngine');
var Constants = require('../../../constants');

var Pyraken = require('./Pyraken');
var IvreRocher = require('./Ivrerocher');
var Algatana = require('./Algatana');

var StepMeshes = {
    'pyraken': Pyraken,
    'ivrerocher': IvreRocher,
    'algatana': Algatana
};

var stepsAdded = 0;

module.exports = {
    addSteps: function(steps) {
        for(var i=0; i<steps.length; i++) {
            addStep(steps[i]);
        }
    },
    add: addStep,
    resetStepsRank: function() {
        stepsAdded = 0;
    }
};

function addStep(step) {
    if(step.state.name != Constants.stepState.NOTHING.name) {
        var stepMesh = createStepMesh(step);
        gameEngine.addSceneElement(stepMesh.mesh);
        gameEngine.addRenderElement(stepMesh);
        gameEngine.addCameraObservationElement(stepMesh.mesh, function () {
            console.log('plus dedans la camera');
        });
    }
    stepsAdded++;
    console.log(stepsAdded);
}

function createStepMesh(step) {
    var meshType = getMeshTypeForStep(step.state.name);
    var StepMesh = StepMeshes[meshType];
    return new StepMesh(stepsAdded);
}

function getMeshTypeForStep(stepName) {
    //return Constants.meshStepMap[stepName];
    return stepName.toLowerCase();
}