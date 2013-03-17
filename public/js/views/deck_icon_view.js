App.views.DeckIconView = Backbone.View.extend({
    tagName : 'div',
    className : 'sub_header_decks_container',

    deckOptionsTemplate :_.template($('#deck-menu-template').html() || ''),

    events : {
        'click .close' : 'deleteDeck',
        'click [data-type=view]' : 'viewDeck',
        'click [data-type=edit]' : 'editDeck'
    },

    initialize : function() {
        this.model.on('change', this.updateDisplay, this);
    },

    render : function() {
        this.$el
        .data('id', this.model.get('id'))
        .append(
            $('<div />', {
                'class' : 'deckName'
            }).text(this.model.get('name'))
        )
        .append(
            $('<div />', {
                'class' : 'close'
            }).text('✕')
        )
        .append(
            this.deckOptionsTemplate()
        );

        return this;
    },

    updateDisplay : function() {
        this.$('.deckName').text(this.model.get('name'));
    },

    deleteDeck : function(e) {
        var deckId = this.model.get('id');

        App.service.Service.deleteDeck(deckId).done(function() {
            $deckContainer.fadeOut(150, function() {
                $deckContainer.remove();
            });
        }).fail(function(err) {
            alert("deck failed to get deleted");
        });
    },

    viewDeck : function(e) {
        var deckId = this.model.get('id');

        window.location.replace('/deck/' + deckId);
    },

    editDeck : function(e) {
        var deckId = this.model.get('id');

        var editDeckDialogView = new App.views.EditDeckDialogView({
            model : App.session.deckCollection.get(deckId)
        });

        editDeckDialogView.render().$el.appendTo($('body'));
        editDeckDialogView.show();
    }
});
