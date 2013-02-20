App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html()),

    events : {
        'click .cornerButton' : 'onSeeAnswer',
        'click .close' : 'onDelete'
    },

    initialize : function() {
    },

    render : function() {
        this.$el.html(this.questionTmpl({question : this.model.get('question')}));
        this.$el.addClass('all ' + this.model.get('types').join(' '));
        this.$el.data('answer', this.model.get('answer'));

        return this;
    },

    onSeeAnswer : function() {
        var answerDialogView = new App.views.AnswerDialogView({model : this.model});
        answerDialogView.render().show();
    },

    onDelete : function() {

    }
});
