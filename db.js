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
        });

        db.createCollection('cards', function(err, collection) {
            console.log('cards collection created')
        });

        return deferred;
    },

    getAllCards : function(db) {
        var deferred = Deferred();

        db.collection('cards', function(err, collection) {

            if(!err) {
                var cursor = collection.find({}, function(err, card) {
                            if(err || !card) {
                                deferred.reject('No document found');
                            }
                        });

                var cardsList = [];
                cursor.each(function(item) {
                    cardsList.push(item);
                });
                deferred.resolve(cardsList);

            }
            else {
                deferred.reject('Cannot connect to cards collection');
            }
        });

        return deferred;
    },

    getCard : function(db, id) {
        var deferred = Deferred();

        db.collection('cards', function(err, collection) {

            var query = {
                _id : id
            };

            if(!err) {
                collection.findOne(query, function(err, card) {
                    if(err || !card) {
                        deferred.reject('No document found');
                    }
                    else {
                        // Found the document
                        deferred.resolve(card);
                    }
                });
            }
            else {
                deferred.reject('Cannot connect to cards collection');
            }
        });

        return deferred;
    },

    createCard : function(db, card) {
        var deferred = Deferred();

        db.collection('cards', function(err, collection) {

            if(!err) {

                collection.insert(card, {safe:true}, function(err, records) {
                    if(!err) { deferred.resolve(records);}
                    else {
                        console.warn(err.message);
                        deferred.reject('Error creating card');

                        if (err && err.message.indexOf('E11000 ') !== -1) {
                            // this _id was already inserted in the database
                        }
                    }
                });
            }
            else {
                deferred.reject('Cannot connect to cards collection');
            }
        });

        return deferred;
    },

    updateCard : function(db, id, card) {
        var deferred = Deferred();

        db.collection('cards', function(err, collection) {

            var query = {
                _id : id
            };

            if(!err) {

                collection.findAndModify(query, [['_id','asc']], {$set: card}, {new:true}, function(err, updatedCard) {
                    if(!err) { deferred.resolve(updatedCard);}
                    else {
                        console.warn(err.message);
                        deferred.reject('Error creating card');

                        if (err && err.message.indexOf('E11000 ') !== -1) {
                            // this _id was already inserted in the database
                        }
                    }
                });
            }
            else {
                deferred.reject('Cannot connect to cards collection');
            }
        });

        return deferred;
    },

    deleteCard : function(db, id) {
        var deferred = Deferred();

        db.collection('cards', function(err, collection) {

            var query = {
                _id : id
            };

            if(!err) {

                collection.findAndModify(query, [['_id','asc']], {$set: {'status':'deleted'}}, {new:true}, function(err, updatedCard) {
                    if(!err) { deferred.resolve(updatedCard);}
                    else {
                        console.warn(err.message);
                        deferred.reject('Error deleting card');

                        if (err && err.message.indexOf('E11000 ') !== -1) {
                            // this _id was already inserted in the database
                        }
                    }
                });
            }
            else {
                deferred.reject('Cannot connect to cards collection');
            }
        });

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
                deferred.reject('Cannot connect to cards collection');
            }
        });

        return deferred;
    }


};

// Export the APIs
for(var i in apis) {
    exports[i] = apis[i];
}
