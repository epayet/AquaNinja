exports.getExtension = function(path) {
    var split = path.split('.');
    return split[split.length - 1];
};