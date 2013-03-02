App.views.CreateCardDialogView = Backbone.View.extend({
    el : '#dialog_bg',

    template :_.template($('#create-card-dialog-template').html() || ''),

    events : {
        'click .close' : 'onClose',
        'click #questionContinueButton' : 'onQuestionEntered'
    },

    render : function() {
        var $dialog = this.$('#dialog');

        $dialog.html(this.template());

        return this;
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide();
    },

    onClose : function() {
        this.hide();
    },

    onQuestionEntered : function() {
        this.$('.createCardDialogInnerContainer').animate({
            left : '-=400'
        }, 180);
    }
});
