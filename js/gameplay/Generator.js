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

Generator.prototype.generate = function() {
    var steps = [];
    for(var i=0; i<this.nbMaxSteps; i++) {
        var randomStepName = this.getRandomStep();
        steps.push(new Step({rank: i, state: this.stepStates[randomStepName]}));
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