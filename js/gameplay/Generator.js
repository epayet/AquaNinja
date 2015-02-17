var Step = require('./Step');

function Generator(options) {
    this.stepStates = options.stepStates;
    this.nbMaxSteps = options.nbMaxSteps;
    this.availableSteps = this.getAvailableStates();
}

Generator.prototype.getAvailableStates = function() {
    var availableSteps = [];
    for(var key in this.stepStates) {
        availableSteps.push(key);
    }
    return availableSteps;
};

Generator.prototype.generate = function(start) {
    if(start === undefined) start = 0;
    var steps = [];
    var stepRandom = 0;
    for(var i=0; i<this.nbMaxSteps; i++) {
        var stepName = 'NOTHING';
        if(stepRandom == 5) {
            stepName = this.getRandomStep();
            stepRandom = 0;
        }
        stepRandom++;
        steps.push(new Step({rank: start + i, state: this.stepStates[stepName]}));
    }
    return steps;
};

Generator.prototype.onNextStep = function(step) {

};

Generator.prototype.getRandomStep = function() {
    var rand = Math.floor(Math.random() * this.availableSteps.length);
    return this.availableSteps[rand];
};

module.exports = Generator;