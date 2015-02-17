var gameEngine = require("./gameEngine/gameEngine");
var Gameplay = require('./gameplay/Gameplay');
var Character = require('./gameplay/Character');
var Constants = require('./constants');
var CommandListener = require('./eventListener/CommandListener');
var Ninja = require('./gameElements/mesh/Ninja');
var groundManager = require('./gameElements/mesh/groundManager');
var StepManager = require('./gameElements/mesh/step/StepManager');
var Score = require('./gameElements/score');

module.exports = {
    init: function(width, height) {
        gameEngine.setLimitTerrain(Constants.TerrainSize.height);
        gameEngine.setCamera(require("./gameElements/camera"));
        gameEngine.loadModels(Constants.Paths.Models, function () {
            var messageBox = document.getElementById('message');
            messageBox.style.display = "none";

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
            window.ninja = ninja;
            groundManager.start();

            var stepManager = new StepManager(gameplay);

            gameEngine.setSize(width, height);

            gameEngine.addRenderElement(require("./gameEngine/misc/stats"));
            //gameEngine.addRenderElement(require("./gameEngine/controls/orbitControls"));

            //gameEngine.addSceneElement(require("./gameElements/light"));
            gameEngine.addSceneElement(require("./gameElements/directionalLight"));

            gameEngine.addSceneAnimatedElement(ninja.mesh);
            gameEngine.start();
            //gameEngine.addSceneElement(require('./gameElements/mesh/background'));
            gameEngine.addRenderElement(require('./gameElements/mesh/background'));

            var commandListener = new CommandListener(character);
            gameEngine.addEventListener("onKeyDown", commandListener.createCallback());

            var score = new Score(gameplay);

            gameplay.addEventListener("onDead", function () {
                ninja.updateState("DEATH");
            });

            setInterval(function () {
                gameplay.goNextStep();
            }, Constants.timeBetweenSteps);
        });
    },

    resize: function(width, height) {
        gameEngine.resize(width, height);
    }
};