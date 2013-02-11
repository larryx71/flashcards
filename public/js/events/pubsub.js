App.pubsub = {
    _events : {},
    _alreadyRegistered : function(eventName, func) {
        var registeredCbs = this._events[eventName];
        for(var i = 0; i < registeredCbs.length; i++) {
            var registeredCb = registeredCbs[i];
            if(func == registeredCb.func)
                return true;
        }

        return false;
    },
    subscribe : function(evt, func, context) {
        var eventNames = [],
            eventName, event, obj;

        if(typeof evt === 'string') {
            eventNames.push(evt);
        }
        else if(evt instanceof Array) {
            eventNames = eventNames.concat(evt);
        }

        for(var i = 0; i < eventNames.length; i++) {
            eventName = eventNames[i];
            event = this._events[eventName];

            obj = {};
            obj.func = func;
            obj.ctx = context;

            if(!event) {
                // If event doesn't exist, create it
                event = [];
                event.push(obj);
                this._events[eventName] = event;
            }
            else if(!this._alreadyRegistered(eventName, func)){
                // If event already exists, add an obj to it
                event.push(obj);
            }
        }
    },
    publish : function(eventName) {
        var event = this._events[eventName];

        if(event) {
            for(var i = 0; i < event.length; i++) {
                var obj = event[i],
                    func = obj.func;
                ctx = obj.ctx;

                func.apply(ctx, Array.prototype.slice.call(arguments, 1));
            }
        }
    },
    unsubscribe : function(eventName, func) {
        var event = this._events[eventName];

        if(event) {
            for(var i = 0; i < event.length; i++) {
                var obj = event[i];

                if(obj.func == func) {
                    // Found it, now get rid of it
                    event.splice(i, 1);
                }
            }
        }
    }
};
