App.views.HeaderView = Backbone.View.extend({
    el : '#header',

    template :_.template($('#header-template').html() || ''),

    events : {
        'click .decks' : 'toggleDecks',
        'click .addCard' : 'addCard'
    },

    initialize : function() {
        this.$subHeader = $('#sub_header_div');
        this.$subHeaderInner = $('#sub_header_div_inner');
    },

    render : function() {
        this.$el.html(this.template());

        // Only show the options that the user has access to
        if(!App.session.email) {
            // User is not logged in, hide some buttons
            this.$('.decks').hide();
            this.$('.addCard').hide();
        }

        return this;
    },

    toggleDecks : function() {
        if(!this.$subHeader.hasClass('on')) {
            this.$subHeaderInner.empty();

            var decks = [
                {
                    name : 'Clientside',
                    id : 1
                },
                {
                    name : 'Serverside',
                    id : 2
                },
                {
                    name : 'Algorithm',
                    id : 3
                }
            ];

            for(var i = 0; i < decks.length; i++) {
                var deck = decks[i];

                $('<div />', {
                    'class' : 'sub_header_decks_container'
                })
                    .data('id', decks.id)
                    .text(deck.name)
                    .appendTo(this.$subHeaderInner);
            }

            this.$subHeader.animate({
                height : '90'
            }, 180);
        }
        else {
            this.$subHeader.animate({
                height : '0'
            }, 180);
        }

        this.$subHeader.toggleClass('on');
        this.$('.decks').toggleClass('on');
    },

    addCard : function(e) {
        var createCardDialogView = new App.views.CreateCardDialogView();
        createCardDialogView.render();

        $('body').append(createCardDialogView.$el);
        createCardDialogView.show();
    }
});
