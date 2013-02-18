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

    // Catches every 404
    app.use(function(req, res, next) {
        res.send(404, 'Oops, requested page does not exist');
    });
}

function onConnectFail() {
    console.log('connection failed');
}
