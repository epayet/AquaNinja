var steps = [];
var currentStep;
var nextStep;
var stepsPassed = 0;

module.exports = {
    goNextStep: function() {
        currentStep = steps[nextStep.rank];
        nextStep = steps[nextStep.rank + 1];
        stepsPassed++;
        return currentStep;
    },

    setSteps: function(newSteps) {
        steps = newSteps;
        currentStep = steps[0];
        nextStep = steps[1];
    },

    getNextXSteps: function(nbSteps) {
        var askedSteps = [];
        for(var i=stepsPassed; i<stepsPassed + nbSteps; i++) {
            askedSteps.push(steps[i]);
        }
        return askedSteps;
    },

    getStepAfter: function(nbSteps) {
        return steps[stepsPassed + nbSteps];
    }
};