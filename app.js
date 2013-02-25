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

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.static('public'));
    app.use(app.router);
});

dbHelper.connect(database.HOST, database.PORT, database.DB_NAME)
    .done(onConnectSuccessful)
    .fail(onConnectFail);

// Catches every 404
app.use(function(req, res, next) {
    res.send(404, 'Oops, requested page does not exist');
});

app.listen(NODE_PORT);
console.log('Node server started, listening on ' + NODE_PORT);

function onConnectSuccessful(db) {
    console.log('connection successful');

    app.get('/card/:id', function(req, res) {
        dbHelper.getList(db, req.params.id)
            .done(function(list) {
                res.render('list', {
                    list : list
                });
            })
            .fail(function(err) {
                res.send(err);
            });
    });

    app.post('/card', function(req,res) {
        var card = new Flashcard();
        card.set('userid', req.params.userid);
        card.set('question', req.params.question);
        card.set('answer', req.params.answer);
        card.set('viewState', 'public');
        card.set('tags', '');
        //var card = {'userid': 'cting', 'question':'what is 1+1?', 'answer':'2', 'tags':['math'],'viewState': 'public'};
        dbHelper.createCard(db, card);
           // .done(console.log('New card created.'))
           // .fail(console.log('Failed to create new card'));
    });

    app.put('/card/:id', function(req,res) {
        var card = new Flashcard();
        card.set('userid', req.params.userid);
        card.set('question', req.params.question);
        card.set('answer', req.params.answer);
        card.set('viewState', 'public');
        card.set('tags', '');
        //var card = {'userid': 'cting', 'question':'what is 1+1?', 'answer':'2', 'tags':['math'],'viewState': 'public'};
        dbHelper.updateCard(db, card);
        // .done(console.log('New card created.'))
        // .fail(console.log('Failed to create new card'));
    });

    app.delete('/card/:id', function(req,res) {
        var card = new Flashcard();
        card.set('userid', req.params.userid);
        card.set('question', req.params.question);
        card.set('answer', req.params.answer);
        card.set('viewState', 'public');
        card.set('tags', '');
        //var card = {'userid': 'cting', 'question':'what is 1+1?', 'answer':'2', 'tags':['math'],'viewState': 'public'};
        dbHelper.updateCard(db, card);
        // .done(console.log('New card created.'))
        // .fail(console.log('Failed to create new card'));
    });
}

function onConnectFail() {
    console.log('connection failed');
}
