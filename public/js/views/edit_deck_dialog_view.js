App.views.EditDeckDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template :_.template($('#edit-deck-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide',
        'click .Save' : 'saveDeck',
        'click .Finish' : 'createDeck'
    },

    initialize : function() {
        this.isCreateNew = false;
    },

    render : function() {
        if(!this.model) {
            this.isCreateNew = true;
            this.model = new App.models.Deck();
        }

        var id = this.model.get('id');
        var name = this.model.get('name');
        var description = this.model.get('description');

        this.$el.html(this.modalTemplate());
        this.$('#dialog').html(this.template({
            name : name,
            description : description,
            buttonName : this.isCreateNew ? 'Finish' : 'Save'
        }));

        return this;
    },

    saveDeck : function() {
        var self = this;
        var name = $('#editDeckName').val();
        var description = $('#editDeckDescription').val();

        var deck = this.model.toJSON();
        deck.name = name;
        deck.description = description;
        //Validate the name and description
        if($.trim(name) !== '' && $.trim(description) !== '') {
            App.service.Service.editDeck(this.model.get('id'), deck).done(function() {
                self.model.set(deck);
                self.hide();
            }).fail(function(err) {
                alert(err);
                self.hide();
            });
        }
    },

    createDeck : function() {
        var self = this;
        var name = $('#editDeckName').val();
        var description = $('#editDeckDescription').val();

        if(this.validate()) {
            var deck = {
                name : name,
                description : description
            };

            App.service.Service.addDeck(deck).done(function() {
                //TODO: need to get the id of the newly created deck
                var id = ~~(Math.random() * 100);
                var newDeck = new App.models.Deck(deck);
                newDeck.set('id', id);

                App.session.deckCollection.add(newDeck);
                self. hide();
            }).fail(function(err) {
                alert(err);
                self.hide();
            });
        }
    },

    validate : function() {
        //TODO:
        return true;
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    }
});
