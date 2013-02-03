var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    Deferred = require('Deferred');

var apis = {
    connect : function(host, port, database) {
        var deferred = Deferred();

        var server = new Server(host, port, {auto_reconnect : true});
        var db = new Db(database, server);

        // Attempt to connect to db
        db.open(function(err) {
            console.log('connected to db');

            err ? deferred.reject(err) : deferred.resolve(db);
        })

        return deferred;
    },

    createList : function(db, cards) {

    },

    getList : function(db, id) {
        var deferred = Deferred();

        db.collection('lists', function(err, collection) {
            // Initialize query obj
            var query = {
                _id : Number(id)
            };

            if(!err) {
                collection.findOne(query, function(err, document) {
                    if(err || !document) {
                        deferred.reject('No document found');
                    }
                    else {
                        // Found the document
                        deferred.resolve(document.cards);
                    }
                });
            }
            else {
                deferred.reject('Cannot connect to collection');
            }
        });

        return deferred;
    }
};

// Export the APIs
for(var i in apis) {
    exports[i] = apis[i];
}
