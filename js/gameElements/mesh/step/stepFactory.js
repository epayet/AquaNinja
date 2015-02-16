var Constants = require('../../../constants');

var Pyraken = require('./Pyraken');
var IvreRocher = require('./Ivrerocher');
var Algatana = require('./Algatana');

var StepMeshes = {
    'pyraken': Pyraken,
    'ivrerocher': IvreRocher,
    'algatana': Algatana
};

module.exports = addStep;

function addStep(step) {
    var stepMesh;
    if(step.state.name != Constants.stepState.NOTHING.name) {
        var meshType = getMeshTypeForStep(step.state.name);
        var StepMesh = StepMeshes[meshType];
        stepMesh = new StepMesh(step);
    }
    return stepMesh;
}

function getMeshTypeForStep(stepName) {
    //return Constants.meshStepMap[stepName];
    return stepName.toLowerCase();
}