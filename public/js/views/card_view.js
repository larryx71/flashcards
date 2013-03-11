App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html() || ''),

    events : {
        'click [data-type=view]' : 'onView',
        'click [data-type=delete]' : 'onDelete',
        'click [data-type=edit]' : 'onEdit'
    },

    initialize : function() {
        this.model.on('change', this.onModelChanged, this);
    },

    render : function() {
        this.$el.html(this.questionTmpl({question : this.model.get('question')}));
        this.$el.addClass('all ' + this.model.get('types').join(' '));
        this.$el.data('answer', this.model.get('answer'));

//        if(!App.session.email || this.model.get('owner_id') != App.session.email) {
//            // user is not logged in or this user is not the owner of this card
//            // hide the edit button
//            this.$('[data-type=edit]').hide();
//        }

        return this;
    },

    onModelChanged : function() {
        console.log("model changed!");
        this.render();
        App.pubsub.publish(App.events.CARD_UPDATED);
    },

    onEdit : function() {
        var answerDialogView = new App.views.AnswerDialogView({model : this.model});
        answerDialogView.render()

        $('body').append(answerDialogView.$el);
        answerDialogView.showAdminView();
    },

    onView : function() {
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
