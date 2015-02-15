var Step = function(options) {
    this.state = options.state;
    this.rank = options.rank;
};

Step.prototype.acceptState = function(state) {
    return this.state.counter.indexOf(state) != -1;
};

module.exports = Step;