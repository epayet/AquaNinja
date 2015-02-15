var steps = [];
var currentStep;
var nextStep;

module.exports = {
    goNextStep: function() {
        currentStep = steps[nextStep.rank];
        nextStep = steps[nextStep.rank + 1];
        //console.log(currentStep);
        return currentStep;
    },

    setSteps: function(newSteps) {
        steps = newSteps;
        currentStep = steps[0];
        nextStep = steps[1];
    },

    getNextStep: function(){
        return nextStep;
    }
};