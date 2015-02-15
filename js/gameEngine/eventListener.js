var listeners = {
    'onKeyDown': [],
    'onKeyUp': []
};

module.exports = {
    add: function(eventType, callback) {
        listeners[eventType].push(callback);
    },

    create: function(eventType) {
        return function(e) {
            e = e || window.event;
            for(var i=0; i<listeners[eventType].length; i++) {
                listeners[eventType][i](e);
            }
        };
    }
};