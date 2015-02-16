var gameEngine = require("./gameEngine/gameEngine");
var Gameplay = require('./gameplay/Gameplay');
var Character = require('./gameplay/Character');
var Constants = require('./constants');
var CommandListener = require('./eventListener/CommandListener');
var Ninja = require('./gameElements/mesh/Ninja');
var Ground = require('./gameElements/mesh/Ground');
var groundManager = require('./gameElements/mesh/groundManager');

module.exports = {
    init: function(width, height) {
        gameEngine.loadModels(Constants.Paths.Models, function () {
            var character = new Character({
                availableStates: Constants.ninjaState,
                commands: Constants.commandMap
            });
            var ninja = new Ninja(character);
            //var ground = new Ground();
            groundManager.start();

            gameEngine.setSize(width, height);

            gameEngine.addRenderElement(require("./gameEngine/misc/stats"));
            //gameEngine.addRenderElement(require("./gameEngine/controls/orbitControls"));
            //gameEngine.addRenderElement(ground);

            gameEngine.setCamera(require("./gameElements/camera"));
            gameEngine.addSceneElement(require("./gameElements/light"));

            //gameEngine.addSceneElement(ground.mesh);
            gameEngine.addSceneAnimatedElement(ninja.mesh);

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
            }, Constants.timeBetweenSteps);
        });
    },

    resize: function(width, height) {
        gameEngine.resize(width, height);
    }
};