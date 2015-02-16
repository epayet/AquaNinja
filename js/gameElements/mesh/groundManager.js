var Ground = require('./Ground');
var gameEngine = require('../../gameEngine/gameEngine');
var Constants = require('../../constants');

var nbMaxGrounds = 3;

module.exports = {
    start: function() {
        for(var i=0; i<nbMaxGrounds; i++) {
            var ground = new Ground(i);
            gameEngine.addSceneElement(ground.mesh);
            gameEngine.addRenderElement(ground);
            gameEngine.addCameraObservationElement(ground.mesh, function (disappearedGround) {
                Ground.setPositionForRank(nbMaxGrounds - 1, disappearedGround);
            });
        }
    }
};