var async = require("async");
var loaderFactory = require('./loader/loaderFactory');
var eventListener = require('./eventListener');

var camera;
var scene = new THREE.Scene;
var width, height;
var renderElements = [], animatedElements = [], cameraObservationElements = [];
var models = {};
var renderer;
var otherScenesAndCameras = [];
var clock = new THREE.Clock();
var limitTerrain;

window.onkeydown = eventListener.create('onKeyDown');
window.onkeyup = eventListener.create('onKeyUp');

module.exports = {
    setLimitTerrain: function(limit) {
        limitTerrain = limit;
    },
    setCamera: function(newCamera) {
        camera = newCamera;
        //camera.lookAt(scene.position);
    },

    getCamera: function() {
        return camera;
    },

    getScene: function() {
        return scene;
    },

    getRenderer: function() {
        return renderer;
    },

    addSceneAndCamera: function(newScene, newCamera) {
        otherScenesAndCameras.push({
            scene: newCamera,
            camera: newCamera
        });
    },

    addEventListener: function(eventType, callback) {
        eventListener.add(eventType, callback);
    },

    addRenderElement: function(element) {
        renderElements.push(element);
    },

    addSceneElement: function(element) {
        if(Array.isArray(element)) {
            for(var i=0; i<element.length; i++) {
                scene.add(element[i]);
            }
        } else
            scene.add(element);
    },

    removeSceneElement: function(element) {
        scene.remove(element);
    },

    addSceneAnimatedElement: function(element) {
        scene.add(element);
        animatedElements.push(element);
    },

    addAnimatedElement: function(element) {
        animatedElements.push(element);
    },

    cameraFollow: function(element) {
        element.add(camera);
    },

    addCameraObservationElement: function(sceneElement, callbackWhenOffScreen) {
        cameraObservationElements.push({
            element: sceneElement,
            callback: callbackWhenOffScreen
        });
    },

    loadModels: function(modelPaths, callback) {
        var loadCallbacks = [];
        for(var modelName in modelPaths) {
            var loader = loaderFactory(modelPaths[modelName]);
            loadCallbacks.push(loader.createCallback(modelPaths[modelName], modelName));
        }

        async.parallel(loadCallbacks, function(err, results) {
            for(var i=0; i<results.length; i++) {
                models[results[i].name] = results[i].value;
            }
            callback();
        });
    },

    getModel: function(modelName) {
        return models[modelName]();
    },

    start: function() {
        initRenderer();

        // add the output of the renderer to the html element
        document.body.appendChild(renderer.domElement);

        // call the render function, after the first render, interval is determined
        // by requestAnimationFrame
        render();
    },

    setSize: function(newWidth, newHeight) {
        width = newWidth;
        height = newHeight;
    },

    resize: function(width, height) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    },

    models: models
};

function initRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(width, height);
    renderer.shadowMapEnabled = true;
}

function render() {
    renderer.autoClear = false;
    var delta = clock.getDelta();
    for(var i=0; i<renderElements.length; i++) {
        renderElements[i].update(delta);
    }

    for(var i=0; i<animatedElements.length; i++) {
        var mesh = animatedElements[i];
        mesh.updateAnimation(delta * 1000);
        if(mesh.playAnimationOnce && mesh.currentKeyframe == mesh.endKeyframe) {
            mesh.playAnimation(mesh.defaultAnimation, mesh.defaultAnimationTime);
        }
    }

    for(var i=0; i<cameraObservationElements.length; i++) {
        if(!isStillInScreen(cameraObservationElements[i].element)) {
            cameraObservationElements[i].callback(cameraObservationElements[i].element);
        }
    }

    THREE.AnimationHandler.update(delta);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    for(var i=0; i<otherScenesAndCameras.length; i++) {
        renderer.render(otherScenesAndCameras[i].scene, otherScenesAndCameras[i].camera);
    }
}

function isStillInScreen(element) {
    return !(element.position.z > limitTerrain);
}