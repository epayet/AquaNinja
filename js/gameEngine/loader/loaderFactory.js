var util = require('../util');

module.exports = function(modelPath) {
    var extension = util.getExtension(modelPath);
    switch (extension) {
        case 'json':
            return require('./loaderJson');
        case 'dae':
            return require('./loaderDae');
    }
};