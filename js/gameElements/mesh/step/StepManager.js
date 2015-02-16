var stepFactory = require('./stepFactory');
var Constants = require('../../../constants');

function StepManager(gameplay) {
    this.gameplay = gameplay;
    this.stepsPassed = 0;

    var self = this;
    gameplay.addEventListener("onNextStep", function () {
        self.stepPassed();
    });

    this.addNextSteps();
}

StepManager.prototype.stepPassed = function() {
    this.stepsPassed++;
    if(this.stepsPassed > Constants.nbMaxStepsOnScreen) {
        this.addNextSteps();
        this.stepsPassed = 0;
        stepFactory.resetStepsRank();
    }
};

StepManager.prototype.addNextSteps = function() {
    var nextSteps = this.gameplay.getNextXSteps(Constants.nbMaxStepsOnScreen);
    stepFactory.addSteps(nextSteps);
};

module.exports = StepManager;