App.views.AppView = Backbone.View.extend({
    el : '#main',

    events : {

    },

    render : function() {
        var c1 = new App.models.Card();
        c1.set('question', 'How do you find the intersection of two array?');

        var c2 = new App.models.Card();
        c2.set('question', 'What is 1 + 1?');

        var c3 = new App.models.Card();
        c3.set('question', 'Here\'s a really really long question, basically I just want to fill up some space.');

        var c4 = new App.models.Card();
        c4.set('question', 'What are global variables?');

        var c5 = new App.models.Card();
        c5.set('question', 'How are global variables declared?');

        var c6 = new App.models.Card();
        c6.set('question', 'What are Javascript types?');

        var cardCollection = new App.collections.CardsCollection([c1, c2, c3, c4, c5, c6]);
        var listView = new App.views.ListView({collection : cardCollection});
        listView.render();
    }
});
