var jasmine = require('jasmine-node');
jasmine.run({
    specFolders: ['./test'],
    watchFolders: ['./test'],
    isVerbose: true,
    showColors: true
});