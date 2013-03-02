App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html() || ''),

    events : {
        'click [data-type=view]' : 'onSeeAnswer',
        'click [data-type=delete]' : 'onDelete'
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
        answerDialogView.render()

        $('body').append(answerDialogView.$el);
        answerDialogView.show();
    },

    onDelete : function() {
        var self = this;

        console.log('delete, card id = ' + this.model.get('id'));
        App.service.Service.deleteCard(this.model.get('id'))
            .done(function() {
                App.pubsub.publish(App.events.CARD_DELETED, self.$el);
            });
    }
});
