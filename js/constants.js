module.exports = {
    ninjaState: {
        RUN: 'RUN',
        DEFAULT: 'RUN',
        ATTACK: 'ATTACK',
        JUMP: 'JUMP',
        SLIDE: 'SLIDE'
    },

    stepState: {
        NOTHING: {
            counter: ['RUN'],
            name: "NOTHING"
        },

        PYRAKEN: {
            counter: ['ATTACK'],
            name: "PYRAKEN"
        },

        ALGATANA: {
            counter: ['JUMP'],
            name: "ALGATANA"
        },

        IVREROCHER: {
            counter: ['SLIDE'],
            name: "IVREROCHER"
        }
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
        'SLIDE': 'death'
    },

    timeBetweenSteps: 500,

    Paths: {
        Models: {
            Ninja: "assets/3d/ninja/ninja.json"
        },

        Skins: {
            Ninja: "assets/3d/ninja/nskinbr.jpg",
            Sand: "assets/textures/saand.jpg"
        }
    },

    Models: {
        Ninja: "Ninja"
    },

    TerrainSize: {
        width: 60,
        height: 50
    }
};