var race = require('./race');
var Step = require('./Step');

var Gameplay = function(options) {
    this.stepStates = options.stepStates;
    this.race = race;
    this.initSteps();
};

Gameplay.prototype.initSteps = function () {
    var stepStates = this.stepStates;
    var steps = [];

    //TODO El Generator
    var availableSteps = [];
    for(var key in stepStates) {
        availableSteps.push(key);
    }
    var nbSteps = availableSteps.length;

    for(var i=0; i<100; i++) {
        var rand = Math.floor(Math.random() * nbSteps);
        var randomStepName = availableSteps[rand];
        steps.push(new Step({rank: i, state: stepStates[randomStepName]}));
    }

    race.setSteps(steps);
};

Gameplay.prototype.updateStep = function() {
    return race.goNextStep();
};

Gameplay.prototype.isDead = function(state, step) {
    return !step.acceptState(state);
};

module.exports = Gameplay;