App.views.HomeView = Backbone.View.extend({
    el : '#main',

    events : {

    },

    initialize : function() {
        var self = this;

        this.cardCollection = null;
        this.listView = null;
        this.filterView = null;
    },

    render : function() {
        var introView = new App.views.IntroView();
        introView.render();

        var c1 = new App.models.Card();
        c1.set('types', ['javascript']);
        c1.set('question', 'How do you find the intersection of two array?');
        c1.set('answer', 'Who knows.');

        var c2 = new App.models.Card();
        c2.set('types', ['javascript']);
        c2.set('question', 'What is 1 + 1?');
        c2.set('answer', 'Who knows.');

        var c3 = new App.models.Card();
        c3.set('types', ['coffeescript']);
        c3.set('question', 'Here\'s a really really long question, basically I just want to fill up some space.');
        c3.set('answer', 'Who knows.');

        var c4 = new App.models.Card();
        c4.set('types', ['javascript']);
        c4.set('question', 'What are global variables?');
        c4.set('answer', 'Who knows.');

        var c5 = new App.models.Card();
        c5.set('types', ['coffeescript']);
        c5.set('question', 'How are global variables declared?');
        c5.set('answer', 'Who knows.');

        var c6 = new App.models.Card();
        c6.set('types', ['javascript']);
        c6.set('question', 'What are Javascript types?');
        c6.set('answer', 'Who knows.');

        App.session.cardCollection = new App.collections.CardsCollection([c1, c2, c3, c4, c5, c6]);
        this.listView = new App.views.ListView({collection : App.session.cardCollection});
        this.listView.render();

        this.filterView = new App.views.FilterView();
        this.filterView.render();
    }
});
