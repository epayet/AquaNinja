var Constants = require("../../Constants");
var gameEngine = require("../../gameEngine/gameEngine");

var Ninja = function(character) {
    var self = this;
    character.addEventListener('onStateUpdated', function (state) {
        self.updateState(state);
    });

    this.mesh = this.createMesh();
    this.updateState(Constants.ninjaState.DEFAULT);
};

Ninja.prototype.createMesh = function() {
    var ninjaModel = gameEngine.models[Constants.Models.Ninja];
    var mesh = createMesh(ninjaModel);
    //mesh.position.z = Constants.TerrainSize.width/2;
    mesh.parseAnimations();
    return mesh;
};

Ninja.prototype.updateState = function(state) {
    if(state != this.previousState) {
        var animation = this.getAnimationForState(state);
        this.mesh.playAnimation(animation, 15);
    }
    this.previousState = state;
};

Ninja.prototype.getAnimationForState = function(state) {
    return Constants.ninjaAnimationStateMap[state];
};

module.exports = Ninja;

function createMesh(ninjaModel) {
    var geometry = ninjaModel.geometry;

    geometry.computeMorphNormals();
    var mat = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture(Constants.Paths.Skins.Ninja),
        morphTargets: true, morphNormals: true
    });

    return new THREE.MorphAnimMesh(geometry, mat);
}