var Character = function(options) {
    this.availableStates = options.availableStates;
    this.commands = options.commands;
    this.resetState();
    this.listeners = {};
};

Character.prototype.addEventListener = function(eventType, callback) {
    if(!this.listeners[eventType])
        this.listeners[eventType] = [];
    this.listeners[eventType].push(callback);
};

Character.prototype.setCommand = function(command) {
    this.nextState = this.getStateForCommand(command);
};

Character.prototype.getStateForCommand = function(command) {
    return this.commands[command];
};

Character.prototype.updateState = function() {
    if(this.state != this.nextState) {
        this.state = this.nextState;
    } else
        this.state = this.availableStates.DEFAULT;

    this.nextState = this.availableStates.DEFAULT;
    for(var i=0; i<this.listeners["onStateUpdated"].length; i++) {
        this.listeners["onStateUpdated"][i](this.state);
    }
};

Character.prototype.resetState = function() {
    this.state = this.availableStates.DEFAULT;
    this.nextState = this.availableStates.DEFAULT;
};

module.exports = Character;