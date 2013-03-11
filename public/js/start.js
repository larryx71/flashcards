$(function() {
    //FIXME: assume this user is logged
    App.session.email = 'test@gmail.com';

    // Prepopulate some session models
    var deck1 = new App.models.Deck({
        id : 1,
        name : 'Clientside',
        description : 'clientside technologies'
    });

    var deck2 = new App.models.Deck({
        id : 2,
        name : 'Serverside',
        description : 'serverside technologies'
    });

    var deck3 = new App.models.Deck({
        id : 3,
        name : 'Algorithm',
        description : 'algorithm technologies'
    });

    App.session.deckCollection = new Backbone.Collection([deck1, deck2, deck3]);

    switch(viewState) {
        case 'home':
            var homeView = new App.views.HomeView();
            homeView.render();
            break;
        case 'personal':
            var appView = new App.views.AppView();
            appView.render();
            break;
        default:
            break;
    }
});
