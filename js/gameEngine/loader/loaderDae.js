var async = require('async');

var loader = new THREE.ColladaLoader();
loader.options.convertUpAxis = true;
var daePool = {};
var nbBufferDae = 15;

exports.createCallback = function(modelPath, modelName) {
    return function(callback) {
        cacheAsync(modelPath, modelName, function () {
            callback(null, {
                value: function() {
                    var dae = daePool[modelName].pop();
                    if(daePool[modelName].length < nbBufferDae / 2) {
                        cacheAsync(modelPath, modelName);
                    }
                    return dae;
                },
                name: modelName
            });
        });
    };
};

function cacheAsync(modelPath, modelName, callback) {
    console.log('cache');
    var loadCallbacks = [];
    for(var i=0; i<nbBufferDae; i++) {
        loadCallbacks.push(createCallback());
    }

    if(!daePool[modelName]) daePool[modelName] = [];

    async.parallel(loadCallbacks, function (err, results) {
        for(var i=0; i<results.length; i++) {
            daePool[modelName].push(results[i]);
        }
        if(callback) callback();
    });

    function createCallback() {
        return function(callback) {
            load(modelPath, function (dae) {
                callback(null, dae);
            });
        };
    }
}

function load(modelPath, callback) {
    loader.load(modelPath, function (collada) {
        var dae = collada.scene;

        dae.traverse(function (child) {
            if (child instanceof THREE.SkinnedMesh) {
                var animation = new THREE.Animation(child, child.geometry.animation);
                animation.play();
            }
        });

        dae.updateMatrix();
        callback(dae);
    });
}