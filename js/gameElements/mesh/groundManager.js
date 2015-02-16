var Ground = require('./Ground');
var gameEngine = require('../../gameEngine/gameEngine');

var nbMaxGrounds = 1;

module.exports = {
    start: function() {
        for(var i=0; i<nbMaxGrounds; i++) {
            var ground = new Ground(i);
            gameEngine.addSceneElement(ground.mesh);
            gameEngine.addRenderElement(ground);
            gameEngine.addCameraObservationElement(ground.mesh, function () {
                console.log('plus dedans la camera');
            });
        }
    }
};