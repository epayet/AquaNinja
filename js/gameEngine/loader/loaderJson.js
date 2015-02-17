var loader = new THREE.JSONLoader();

module.exports = {
    createCallback: function(modelPath, modelName) {
        return function(callback) {
            loader.load(modelPath, function (geometry, material) {
                callback(null, {
                    value: function(){
                        return {
                            geometry: geometry,
                            material: material
                        }
                    },
                    name: modelName
                });
            });
        };
    }
};