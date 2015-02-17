var gameEngine = require("./gameEngine/gameEngine");
var Gameplay = require('./gameplay/Gameplay');
var Character = require('./gameplay/Character');
var Constants = require('./constants');
var CommandListener = require('./eventListener/CommandListener');
var Ninja = require('./gameElements/mesh/Ninja');
var groundManager = require('./gameElements/mesh/groundManager');
var StepManager = require('./gameElements/mesh/step/StepManager');

module.exports = {
    init: function(width, height) {
        gameEngine.setLimitTerrain(Constants.TerrainSize.height);
        gameEngine.loadModels(Constants.Paths.Models, function () {
            var character = new Character({
                availableStates: Constants.ninjaState,
                commands: Constants.commandMap
            });
            var gameplay = new Gameplay({
                stepStates: Constants.stepState,
                character: character,
                nbMaxSteps: Constants.nbMaxSteps
            });

            var ninja = new Ninja(character);
            groundManager.start();

            var stepManager = new StepManager(gameplay);

            gameEngine.setSize(width, height);

            gameEngine.addRenderElement(require("./gameEngine/misc/stats"));
            //gameEngine.addRenderElement(require("./gameEngine/controls/orbitControls"));

            gameEngine.setCamera(require("./gameElements/camera"));
            gameEngine.addSceneElement(require("./gameElements/light"));

            gameEngine.addSceneAnimatedElement(ninja.mesh);

            gameEngine.start();

            var commandListener = new CommandListener(character);
            gameEngine.addEventListener("onKeyDown", commandListener.createCallback());

            setInterval(function () {
                if(!gameplay.goNextStep())
                    ninja.updateState("DEATH")


            }, Constants.timeBetweenSteps);
        });
    },

    resize: function(width, height) {
        gameEngine.resize(width, height);
    }
};