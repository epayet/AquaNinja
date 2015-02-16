var stepFactory = require('./stepFactory');

function IvreRocher(stepRank) {
    this.mesh = stepFactory.stepRank(stepRank);
}

IvreRocher.prototype.update = function(delta) {

};

module.exports = IvreRocher;