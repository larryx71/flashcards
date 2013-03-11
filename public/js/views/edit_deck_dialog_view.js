App.views.EditDeckDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template :_.template($('#edit-deck-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide',
        'click .saveButton' : 'saveDeck'
    },

    render : function() {
        var id = this.model.get('id');
        var name = this.model.get('name');
        var description = this.model.get('description');

        this.$el.html(this.modalTemplate());
        this.$('#dialog').html(this.template({
            name : name,
            description : description
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

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    }
});
