App.views.AnswerDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template : _.template($('#card-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide',
        'click .saveButton' : 'saveCard'
    },

    render : function() {
        var question = this.model.get('question');
        var answer = this.model.get('answer');

        this.$el.html(this.modalTemplate());
        this.$('#dialog').html(this.template({question : question, answer : answer}));

        return this;
    },

    renderAdminUI : function() {
        var q = this.$('.q > div'),
            a = this.$('.a > div'),
            questionHeight = q.height(),
            answerHeight = a.height();

        q.hide();
        a.hide();
        this.$('.editQuestion').attr('rows', Math.ceil(questionHeight / 18)).show();
        this.$('.editAnswer').attr('rows', Math.ceil(answerHeight / 18)).show();

        $('<div />', {
            'id' : 'answer_dialog_footer',
            'class' : 'clearFix'
        }).append(
            $('<div />', {
                'class' : 'big_button saveButton'
            }).css({
                'margin-top' : '15px',
                'float' : 'right'
            }).text('Save')
        ).appendTo($('#dialog'));
    },

    saveCard : function() {
        var self = this;
        var question = $('.editQuestion').val();
        var answer = $('.editAnswer').val();

        if(question && answer) {
            this.model.set('question', question);
            this.model.set('answer', answer);

            App.service.Service.editCard(this.model.toJSON(), this.model.get('_id')).done(function() {
                self.hide();
            }).fail(function(err) {
                alert(err);
            });
        }
        else {
            alert('you must enter a valid question and answer');
        }
        this.model.set('question', this.$('.editQuestion'))
    },

    show : function() {
        this.$el.show();

        this.renderAdminUI();
        if(App.session.email) {
            if(this.model.get('owner_id') === App.session.email) {
                // this is the owner of this card, make the fields editable

            }
        }
    },

    hide : function() {
        this.$el.hide().remove();
    }
});
