var race = require('./race');
var Generator = require('./generator');

var Gameplay = function(options) {
    this.stepStates = options.stepStates;
    this.race = race;
    this.character = options.character;
    this.listeners = {
        onNextStep: [],
        onDead: [],
        onNextRealStep: []
    };
    this.nbMaxSteps = options.nbMaxSteps;
    this.generator = new Generator({
        stepStates: options.stepStates,
        nbMaxSteps: options.nbMaxSteps
    });
    var self = this;
    this.addEventListener("onNextStep", function (step) {
        self.generator.onNextStep(step);
    });
    this.initSteps();
};

Gameplay.prototype.initSteps = function () {
    var steps = this.generator.generate();
    race.setSteps(steps);
};

Gameplay.prototype.addEventListener = function(eventType, callback) {
    this.listeners[eventType].push(callback);
};

Gameplay.prototype.goNextStep = function() {
    var newState = this.character.updateState();
    var newStep = this.updateStep();
    //console.log("State: " + newState + ", step: " + newStep.state.name);
    //console.log(newStep.state.name);
    for(var i=0; i<this.listeners["onNextStep"].length; i++) {
        this.listeners["onNextStep"][i](newStep);
    }
    for(var i=0; i<this.listeners["onNextRealStep"].length; i++) {
        if(newStep.state.name != this.stepStates.NOTHING.name) {
            this.listeners["onNextRealStep"][i](newStep);
        }
    }
    this.updateSteps();
    //return !this.isDead(newState, newStep);
    return false;
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

Gameplay.prototype.updateSteps = function() {
    var stepsPassed = race.getStepsPassed();
    var steps = race.getSteps();
    var limit = (steps.length * 70) / 100;
    if(stepsPassed > limit) {
        var nextSteps = this.generator.generate(race.getStepsPassed() - 1);
        race.addSteps(nextSteps);
    }
};

Gameplay.prototype.isDead = function(state, step) {
    var dead = !step.acceptState(state);
    if(dead) {
        //console.log("State: " + state + ", step: " + step.state.name);
        //debugger;
        for(var i=0; i<this.listeners["onDead"].length; i++) {
            this.listeners["onDead"][i]();
        }
    }
    return dead;
};

module.exports = Gameplay;