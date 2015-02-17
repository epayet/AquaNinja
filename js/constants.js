module.exports = {
    ninjaState: {
        RUN: 'RUN',
        DEFAULT: 'RUN',
        ATTACK: 'ATTACK',
        JUMP: 'JUMP',
        SLIDE: 'SLIDE',
        DEATH: 'DEATH'
    },
    stepState: {
        NOTHING: {
            counter: ['RUN'],
            name: "NOTHING"
        },
        ALGATANA: {
            counter: ['JUMP'],
            name: "ALGATANA"
        }
        ,
        PYRAKEN: {
            counter: ['ATTACK'],
            name: "PYRAKEN"
        }
        //,
        //IVREROCHER: {
        //    counter: ['SLIDE'],
        //    name: "IVREROCHER"
        //}
    },
    commandMap: {
        'UP': 'JUMP',
        'SPACE': 'ATTACK',
        'DOWN': 'SLIDE'
    },
    keyboard: {
        81: 'LEFT',
        68: 'RIGHT',
        38: 'UP',
        40: 'DOWN',
        32: 'SPACE'
    },
    ninjaAnimationStateMap: {
        'RUN': 'walk',
        'JUMP': 'backflip', // jump, backflip
        'ATTACK': 'spinningattack', //spinning, spin, punch, jump
        'SLIDE': 'death',
        'DEATH': 'frontdeath'
    },
    timeBetweenSteps: 2000,
    distanceBetweenSteps: 30,
    nbMaxStepsOnScreen: 10,
    nbMaxSteps: 100,
    Paths: {
        Models: {
            Ninja: "assets/3d/ninja/ninja.json"
            ,Algatana: "assets/3d/katanalgue/katana.dae"
            ,Piraken: "assets/3d/Piraken/Piraken.dae"
        },

        Skins: {
            Ninja: "assets/3d/ninja/nskinbr.jpg",
            Algatana: "assets/3d/Katanalgue/KatanaPommeau",
            Sand: "assets/textures/saand.jpg",
            background: "assets/textures/0df8f20dd9eefcb7bdedacd76abc9b97_large.jpeg"
        }
    },
    Models: {
        Ninja: "Ninja",
        Algatana: "Algatana",
        Piraken: "Piraken"
    },
    TerrainSize: {
        width: 15,
        height: 200
    }
};