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
            console.log('finished loading');
            var character = new Character({
                availableStates: Constants.ninjaState,
                commands: Constants.commandMap
            });
            var gameplay = new Gameplay({
                stepStates: Constants.stepState,
                character: character,
                nbMaxSteps: Constants.nbMaxSteps
            });

            //for(var i=0; i<1; i++) {
            //    var mesh = gameEngine.getModel(Constants.Models.Piraken);
            //    mesh.rotation.y = 0.5 * Math.PI;
            //    mesh.position.y = 5;
            //    mesh.position.x = -i;
            //    var scale = 10;
            //    mesh.scale.set(scale, scale, scale);
            //    gameEngine.addSceneElement(mesh);
            //}

            var ninja = new Ninja(character);
            window.ninja = ninja;
            groundManager.start();

            var stepManager = new StepManager(gameplay);

            gameEngine.setSize(width, height);

            gameEngine.addRenderElement(require("./gameEngine/misc/stats"));
            //gameEngine.addRenderElement(require("./gameEngine/controls/orbitControls"));

            gameEngine.setCamera(require("./gameElements/camera"));
            //gameEngine.addSceneElement(require("./gameElements/light"));
            gameEngine.addSceneElement(require("./gameElements/directionalLight"));

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