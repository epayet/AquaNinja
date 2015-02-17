var gameEngine = require('../../gameEngine/gameEngine');
var Constants = require('../../constants');

var starTexture = THREE.ImageUtils.loadTexture(Constants.Paths.Skins.background);
var cameraBG= new THREE.OrthographicCamera(-window.innerWidth,window.innerWidth,window.innerHeight,-window.innerHeight,-10000,10000);
cameraBG.position.z = 50;
var sceneBG = new THREE.Scene();
var materialColor = new THREE.MeshBasicMaterial({map:starTexture,depthTest : false});
var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1,1),materialColor);
bgPlane.position.z = -100;
bgPlane.scale.set(window.innerWidth *2 , window.innerHeight *2 , 1);
sceneBG.add(bgPlane);
var bgPass = new THREE.RenderPass(sceneBG,cameraBG);
var renderPass = new THREE.RenderPass(gameEngine.getScene(),gameEngine.getCamera());
renderPass.clear = false;
var effectCopy = new THREE.ShaderPass(THREE.CopyShader);
effectCopy.renderToScreen = true;
var composer = new THREE.EffectComposer(gameEngine.getRenderer());
composer.addPass(bgPass);
composer.addPass(renderPass);
composer.addPass(effectCopy);

module.exports = {
    update: function() {
        composer.render();
    }
};

//module.exports = background;