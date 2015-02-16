var Constants = require('./constants');

module.exports = {
    getDistanceForDelta: function(delta) {
        var speed = Constants.distanceBetweenSteps / Constants.timeBetweenSteps;
        var deltaMs = delta * 1000;
        return deltaMs * speed;
    }
};