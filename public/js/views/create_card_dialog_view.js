App.views.CreateCardDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template :_.template($('#create-card-dialog-template').html() || ''),

    events : {
        'click .close' : 'onClose',
        'click #questionContinueButton' : 'onQuestionEntered'
    },

    render : function() {
        this.$el.html(this.modalTemplate());

        this.$('#dialog').html(this.template());

        return this;
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
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
