App.views.SubHeaderView = Backbone.View.extend({
    el : '#sub_header_div',

    deckOptionsTemplate :_.template($('#deck-menu-template').html() || ''),

    events : {
        'click .sub_header_decks_container .close' : 'deleteDeck',
        'click [data-type=view]' : 'viewDeck',
        'click [data-type=edit]' : 'editDeck'
    },

    initialize : function() {
        App.session.deckCollection.on('change', this.onDeckChange, this);
        this.$subHeaderInner = $('#sub_header_div_inner');
    },

    render : function() {
        return this;
    },

    onDeckChange : function(deck) {
        //TODO: update the deck
    },

    deleteDeck : function(e) {
        var $currTarget = $(e.currentTarget);
        var $deckContainer = $currTarget.closest(".sub_header_decks_container");
        var deckId = $deckContainer.data('id');

        App.service.Service.deleteDeck(deckId).done(function() {
            $deckContainer.fadeOut(150, function() {
                $deckContainer.remove();
            });
        }).fail(function(err) {
                alert("deck failed to get deleted");
            });
    },

    viewDeck : function(e) {
        var $currTarget = $(e.currentTarget);
        var $deckContainer = $currTarget.closest('.sub_header_decks_container');
        var deckId = $deckContainer.data('id');

        window.location.replace('/deck/' + deckId);
    },

    editDeck : function(e) {
        var $currTarget = $(e.currentTarget);
        var $deckContainer = $currTarget.closest('.sub_header_decks_container');
        var deckId = $deckContainer.data('id');

        var editDeckDialogView = new App.views.EditDeckDialogView({
            model : App.session.deckCollection.get(deckId)
        });

        editDeckDialogView.render().$el.appendTo($('body'));
        editDeckDialogView.show();
    },

    toggle : function() {
        if(!this.$el.hasClass('on')) {
            this.$subHeaderInner.empty();

            for(var i = 0; i < App.session.deckCollection.length; i++) {
                var deck = App.session.deckCollection.at(i);

                $('<div />', {
                    'class' : 'sub_header_decks_container'
                })
                .data('id', deck.get('id'))
                .text(deck.get('name'))
                .append(
                    $('<div />', {
                        'class' : 'close'
                    }).text('✕')
                )
                .append(
                    this.deckOptionsTemplate()
                )
                .appendTo(this.$subHeaderInner);
            }

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
