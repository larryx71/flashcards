App.views.IntroView = Backbone.View.extend({
    el : '#intro',

    intro_template :_.template($('#intro-template').html()),

    events : {
        'click #start_button' : 'onStart'
    },

    render : function() {
        this.$el.html(this.intro_template({}));
    },

    onStart : function() {
        // Show pop up dialog
        var $dialogContainer = $('#dialog_bg');
        var $dialog = $('#dialog');

        $dialog.append(
            $('<p />').text('What technologies are you interested in?')
        );

        $dialogContainer.show();
    }
});