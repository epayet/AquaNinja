var stepFactory = require('./stepFactory');

function Pyraken(stepRank) {
    this.mesh = stepFactory.createMesh(stepRank);
}

Pyraken.prototype.update = function(delta) {

};

module.exports = Pyraken;