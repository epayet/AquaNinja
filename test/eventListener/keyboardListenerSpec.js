var CommandListener = require('../../js/eventListener/CommandListener');

describe("CommandListener", function () {
    describe('getCommand', function () {
        it('should get the commande for a keyCode', function () {
            var commandListener = new CommandListener();
            var command = commandListener.getCommand(90);
            expect(command).toBe('UP');
        });
    });
});