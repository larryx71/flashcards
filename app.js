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

    app.get('/list/:id', function(req, res) {
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
}

function onConnectFail() {
    console.log('connection failed');
}
