App.views.AnswerDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template : _.template($('#card-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide'
    },

    render : function() {
        var question = this.model.get('question');
        var answer = this.model.get('answer');

        this.$el.html(this.modalTemplate());
        this.$('#dialog').html(this.template({question : question, answer : answer}));

        return this;
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    }
});
