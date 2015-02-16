var stepFactory = require('./stepFactory');
var Constants = require('../../../constants');
var stepPool = require('./stepPool');

function StepManager(gameplay) {
    this.gameplay = gameplay;

    gameplay.addEventListener("onNextStep", function () {
        var lastStepToShow = gameplay.getStepAfter(Constants.nbMaxStepsOnScreen);
        var stepType = lastStepToShow.state.name;
        if(stepType != Constants.stepState.NOTHING.name) {
            var stepMesh = stepPool.get(lastStepToShow);
            stepMesh.updatePosition(Constants.nbMaxStepsOnScreen - 1);
        }
    });

    this.addFirstSteps();
}

StepManager.prototype.addFirstSteps = function() {
    var nextSteps = this.gameplay.getNextXSteps(Constants.nbMaxStepsOnScreen);
    for(var i=0; i<nextSteps.length; i++) {
        var stepType = nextSteps[i].state.name;
        if(stepType != Constants.stepState.NOTHING.name) {
            var stepMesh = stepPool.get(nextSteps[i]);
            stepMesh.updatePosition(i);
        }
    }
};

module.exports = StepManager;