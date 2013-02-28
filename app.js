var express = require('express'),
    dbHelper = require('./db.js'),
    app = express(),
    database = {
        HOST : 'localhost',
        PORT : 27017,
        DB_NAME : 'flashcards'
    },
    NODE_PORT = 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');

// Use the bodyParser middleware to parse post data
app.use(express.bodyParser());

dbHelper.connect(database.HOST, database.PORT, database.DB_NAME)
    .done(onConnectSuccessful)
    .fail(onConnectFail);

app.listen(NODE_PORT);
console.log('Node server started, listening on ' + NODE_PORT);

function onConnectSuccessful(db) {
    console.log('connection successful');

    app.get('/', function(req, res) {
        res.render('index', {});
    });

    app.configure(function() {
        app.use(express.static('public'));
        app.use(app.router);
    });

    app.post('/deck', function(req, res) {
        console.log("in /deck");
        var seedTypes = req.param('seedTypes', '');
        console.dir(req.body);
        console.log(req.body['seedTypes']);
        var seedTypesArray = seedTypes.split(',');

        //TODO: use the seedTypesArray to create a new deck and return the deck id and all of the cards
        res.render('deck', {list : []});
    });

    app.get('/list/:id', function(req, res) {
        dbHelper.getList(db, req.params.id)
            .done(function(list) {
//                res.render('list', {
//                    list : list
//                });
            })
            .fail(function(err) {
                res.send(err);
            });
    });


    app.get('/cards', function(req, res) {
        dbHelper.getAllCards(db)
            .done(function(cardsList) {
                res.send(cardsList);

            })
            .fail(function(err) {
                res.send(err);
            });
    });

    app.get('/card/:id', function(req, res) {
        dbHelper.getCard(db, req.params.id)
            .done(function(card) {
                //res.render('list', {
                //    list : list
                //});
                res.send(card);

            })
            .fail(function(err) {
                res.send(err);
            });
    });

    app.post('/card', function(req,res) {
        var card = {};
        card._id = req.body.id;
        card.userid = req.body.userid;
        card.question = req.body.question;
        card.answer = req.body.answer;
        card.is_public = false;
        card.difficuly = req.body.difficulty;
        card.owner_id = req.body.owner;
        card.creation_ts = new Date();
        card.last_modified = new Date();
        card.status = 'active';

        dbHelper.createCard(db, card)
         .done(function(card) {
                console.log('New card created.')
                res.send(card);
            })
         .fail(function(err) {
                console.log('Failed to create new card')
                res.send(err);
            });
    });

    app.put('/card/:id', function(req,res) {
        var card = {};
        var id = req.params.id;

        if(req.body.userid) { card.userid = req.body.userid; }
        if(req.body.question) { card.question = req.body.question; }
        if(req.body.answer) { card.answer = req.body.answer; }
        if(req.body.is_public) { card.is_public = req.body.is_public; }
        if(req.body.difficulty) { card.difficuly = req.body.difficulty; }
        if(req.body.owner) { card.owner_id = req.body.owner; }
        card.last_modified = new Date();

        dbHelper.updateCard(db, id, card)
            .done(function(card) {
                console.log('Card id:' + req.params.id+ ' updated.');
                res.send(card);
            })
            .fail(function(err) {
                console.log('Failed to update card')
                res.send(err);
            });

    });


    app.delete('/card/:id', function(req,res) {
        var id = req.params.id;

        dbHelper.deleteCard(db, id)
        .done(function(card) {
            console.log('Card id:' + id + ' deleted.');
            res.send({'status':'ok'});
        })
        .fail(function(err) {
            console.log('Failed to delete card')
            res.send(err);
        });
    });

    // Catches every 404
    app.use(function(req, res, next) {
        res.send(404, 'Oops, requested page does not exist');
    });
}

function onConnectFail() {
    console.log('connection failed');
}
