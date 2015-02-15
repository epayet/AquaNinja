var Constants = require('../constants');

var CommandListener = function(character) {
    this.character = character;
};

CommandListener.prototype.createCallback = function() {
    var self = this;
    var character = this.character;
    return function(event) {
        var keyCode = event.keyCode;
        console.log('keycode: ' + keyCode);
        var command = self.getCommand(keyCode);
        if(command)
            character.setCommand(command);
    };
};

CommandListener.prototype.getCommand = function(keyCode) {
    return Constants.keyboard[keyCode];
};

module.exports = CommandListener;