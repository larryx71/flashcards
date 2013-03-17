App.views.SubHeaderView = Backbone.View.extend({
    el : '#sub_header_div',

    deckOptionsTemplate :_.template($('#deck-menu-template').html() || ''),

    events : {
        'click .sub_header_create_deck_container' : 'showCreateDeckDialog'
    },

    initialize : function() {
        App.session.deckCollection.on('add', this.onNewDeckAdded, this);
        this.$subHeaderInner = $('#sub_header_div_inner');
    },

    render : function() {
        return this;
    },

    showCreateDeckDialog : function() {
        var editDeckDialogView = new App.views.EditDeckDialogView();

        editDeckDialogView.render().$el.appendTo($('body'));
        editDeckDialogView.show();
    },

    onNewDeckAdded : function(deck) {
        this.showAllDecks();
    },

    showAllDecks : function() {
        this.$subHeaderInner.empty();

        for(var i = 0; i < App.session.deckCollection.length; i++) {
            var deck = App.session.deckCollection.at(i);

            var deckIconView = new App.views.DeckIconView({model : deck});
            deckIconView.render().$el.appendTo(this.$subHeaderInner);
        }

        $('<div />', {
            'class' : 'sub_header_create_deck_container'
        }).text('Add New Deck').appendTo(this.$subHeaderInner);
    },

    toggle : function() {
        if(!this.$el.hasClass('on')) {
            this.showAllDecks();

            this.$el.animate({
                height : '90'
            }, 180);
        }
        else {
            this.$el.animate({
                height : '0'
            }, 180);
        }

        this.$el.toggleClass('on');
        this.$('.decks').toggleClass('on');
    }
});
