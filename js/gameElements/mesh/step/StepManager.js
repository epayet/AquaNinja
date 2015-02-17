var Constants = require('../../../constants');
var stepPool = require('./stepPool');

function StepManager(gameplay) {
    this.gameplay = gameplay;

    gameplay.addEventListener("onNextStep", function () {
        var lastStepToShow = gameplay.getStepAfter(Constants.nbMaxStepsOnScreen);
        createStepMesh(lastStepToShow, Constants.nbMaxStepsOnScreen - 1);
    });

    this.addFirstSteps();
}

StepManager.prototype.addFirstSteps = function() {
    var nextSteps = this.gameplay.getNextXSteps(Constants.nbMaxStepsOnScreen);
    for(var i=0; i<nextSteps.length; i++) {
        createStepMesh(nextSteps[i], i);
    }
};

function createStepMesh(step, rank) {
    var stepType = step.state.name;
    if(stepType != Constants.stepState.NOTHING.name) {
        var stepMesh = stepPool.get(step);
        stepMesh.updatePosition(rank);
    }
}

module.exports = StepManager;