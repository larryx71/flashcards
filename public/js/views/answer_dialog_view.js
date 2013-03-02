App.views.AnswerDialogView = Backbone.View.extend({
    el : '#dialog_bg',

    template : _.template($('#card-dialog-template').html() || ''),

    events : {
        'click .close' : 'onClose'
    },

    render : function() {
        var $dialog = this.$('#dialog');
        var question = this.model.get('question');
        var answer = this.model.get('answer');

        $dialog.html(this.template({question : question, answer : answer}));

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
    }
});
