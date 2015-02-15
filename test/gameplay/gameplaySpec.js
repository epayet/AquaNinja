var Gameplay = require('../../js/gameplay/Gameplay');
var Constants = require('../../js/constants');
var Step = require('../../js/gameplay/Step');

describe("gameplay", function () {
    var steps, gameplay;

    beforeEach(prepareArrangement);

    describe('goNextStep', function () {
        it('should not die', function () {
            var dead = gameplay.goNextStep('RUN');
            expect(dead).toBe(false);
        });

        it('should die', function () {
            steps[1].state = Constants.stepState.PYRAKEN;
            gameplay.race.setSteps(steps);

            var dead = gameplay.goNextStep('RUN');
            expect(dead).toBe(true);
        });
    });

    function prepareArrangement() {
        steps = [];
        steps.push(new Step({rank: 0, state: Constants.stepState.NOTHING}));
        steps.push(new Step({rank: 1, state: Constants.stepState.NOTHING}));
        steps.push(new Step({rank: 2, state: Constants.stepState.NOTHING}));

        gameplay = new Gameplay({
            stepStates: Constants.stepState
        });
        gameplay.race.setSteps(steps);
    }
});