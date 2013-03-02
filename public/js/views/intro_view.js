App.views.IntroView = Backbone.View.extend({
    el : '#intro',

    intro_template :_.template($('#intro-template').html() || ''),

    events : {
        'click #start_button' : 'onStart'
    },

    render : function() {
        this.$el.html(this.intro_template({}));
    },

    onStart : function() {
        // Show pop up dialog
        var introDialogView = new App.views.IntroDialogView();
        introDialogView.render();

        $('body').append(introDialogView.$el);
        introDialogView.show();
    }
});