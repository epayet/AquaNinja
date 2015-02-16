var race = require('./race');
var Step = require('./Step');

var Gameplay = function(options) {
    this.stepStates = options.stepStates;
    this.race = race;
    this.character = options.character;
    this.listeners = {
        onNextStep: []
    };
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
        if(randomStepName != 'NOTHING')
            steps.push(new Step({rank: i, state: stepStates[randomStepName]}));
    }

    race.setSteps(steps);
};

Gameplay.prototype.addEventListener = function(eventType, callback) {
    this.listeners[eventType].push(callback);
};

Gameplay.prototype.goNextStep = function() {
    var newState = this.character.updateState();
    var newStep = this.updateStep();
    for(var i=0; i<this.listeners["onNextStep"].length; i++) {
        this.listeners["onNextStep"][i]();
    }
    console.log('nextStep');
    //return this.isDead(newState, newStep);
};

Gameplay.prototype.getNextXSteps = function(nbSteps) {
    return race.getNextXSteps(nbSteps);
};

Gameplay.prototype.getStepAfter = function(nbStepAfter) {
    return race.getStepAfter(nbStepAfter);
};

Gameplay.prototype.updateStep = function() {
    return race.goNextStep();
};

Gameplay.prototype.isDead = function(state, step) {
    return !step.acceptState(state);
};

module.exports = Gameplay;