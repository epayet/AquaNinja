var gameEngine = require("./gameEngine/gameEngine");
var Gameplay = require('./gameplay/Gameplay');
var Character = require('./gameplay/Character');
var Constants = require('./constants');
var CommandListener = require('./eventListener/CommandListener');
var Ninja = require('./gameElements/mesh/Ninja');

module.exports = {
    init: function(width, height) {
        gameEngine.loadModels(Constants.Paths.Models, function () {
            var character = new Character({
                availableStates: Constants.ninjaState,
                commands: Constants.commandMap
            });
            var ninja = new Ninja(character);

            gameEngine.setSize(width, height);

            gameEngine.addRenderElement(require("./gameEngine/misc/stats"));
            //gameEngine.addRenderElement(require("./gameEngine/controls/orbitControls"));
            gameEngine.addRenderElement(require('./gameElements/mesh/plane'));

            gameEngine.setCamera(require("./gameElements/camera"));
            gameEngine.addSceneElement(require("./gameElements/light"));

            gameEngine.addSceneElement(require("./gameElements/mesh/plane").mesh);
            gameEngine.addSceneAnimatedElement(ninja.mesh);
            //gameEngine.cameraFollow(ninja.mesh);

            gameEngine.start();

            var gameplay = new Gameplay({
                stepStates: Constants.stepState
            });

            var commandListener = new CommandListener(character);
            gameEngine.addEventListener("onKeyDown", commandListener.createCallback());

            setInterval(function () {
                var newState = character.updateState();
                var newStep = gameplay.updateStep();
                var dead = gameplay.isDead(newState, newStep);
                console.log('dead: ' + dead);
            }, Constants.timeBetweenSteps);
        });
    },

    resize: function(width, height) {
        gameEngine.resize(width, height);
    }
};