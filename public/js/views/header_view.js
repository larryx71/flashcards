App.views.HeaderView = Backbone.View.extend({
    el : '#header',

    template :_.template($('#header-template').html() || ''),

    events : {
        'click .decks' : 'toggleDecks',
        'click .addCard' : 'addCard',
        'click .saveAndCreateAccount' : 'saveAndCreateAnAccount'
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

        this.subHeaderView = new App.views.SubHeaderView();

        return this;
    },

    toggleDecks : function() {
        this.subHeaderView.toggle();
    },

    addCard : function(e) {
        var createCardDialogView = new App.views.CreateCardDialogView();
        createCardDialogView.render();

        $('body').append(createCardDialogView.$el);
        createCardDialogView.show();
    },

    saveAndCreateAnAccount : function() {

    }
});
